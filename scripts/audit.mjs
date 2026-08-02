import { chromium } from 'playwright-core'

const EXECUTABLE = process.env.CHROME_BIN
const browser = await chromium.launch({ executablePath: EXECUTABLE, args: ['--no-sandbox', '--disable-dev-shm-usage'] })

const results = []
const check = (name, ok, detail = '') => results.push({ name, ok, detail })

async function audit(page, route, label) {
  await page.goto(`http://localhost:5199${route}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  check(`${label} horizontal overflow`, overflow <= 0, `overflow=${overflow}px`)

  const sidebarVisible = await page.locator('nav[aria-label="Primary"]').first().isVisible()
  check(`${label} primary nav visible`, sidebarVisible)

  const navCount = await page.locator('nav[aria-label="Primary"] a[href]').count()
  check(`${label} nav links`, navCount >= 7, `count=${navCount}`)

  const imgMissing = await page.evaluate(() => {
    const imgs = Array.from(document.images)
    return imgs.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.alt)
  })
  check(`${label} broken images`, imgMissing.length === 0, imgMissing.slice(0, 3).join(', '))

  const activeTooltips = await page.locator('[role="tooltip"]').count()
  check(`${label} tooltips mounted`, activeTooltips >= 7, `count=${activeTooltips}`)
}

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })

for (const route of ['/', '/discover', '/discover/pho', '/culture', '/nutrition', '/recipes', '/gallery', '/about']) {
  await audit(desktop, route, `desktop ${route}`)
}

// Mobile-specific checks
await mobile.goto('http://localhost:5199/', { waitUntil: 'networkidle' })
await mobile.waitForTimeout(600)

const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
check('mobile horizontal overflow', overflow <= 0, `overflow=${overflow}px`)

const desktopNavVisible = await mobile.locator('nav[aria-label="Primary"]').first().isVisible()
const mobileNavVisible = await mobile.locator('nav[aria-label="Primary"]').last().isVisible()
check('mobile bottom nav shown', mobileNavVisible && !desktopNavVisible)

const mobileNavLinks = await mobile.locator('nav[aria-label="Primary"]').last().locator('a[href]').count()
check('mobile nav links', mobileNavLinks >= 7, `count=${mobileNavLinks}`)

// lightbox interaction
await mobile.goto('http://localhost:5199/gallery', { waitUntil: 'networkidle' })
await mobile.waitForTimeout(600)
const firstImage = mobile.locator('figure button').first()
await firstImage.click({ timeout: 5000 })
await mobile.waitForTimeout(700)
const dialogVisible = await mobile.locator('[role="dialog"]').isVisible()
check('mobile lightbox opens', dialogVisible)
await mobile.keyboard.press('Escape')
await mobile.waitForTimeout(500)

// serving calculator + timer interaction
await desktop.goto('http://localhost:5199/recipes', { waitUntil: 'networkidle' })
await desktop.waitForTimeout(600)
const beginBtn = desktop.getByRole('button', { name: /Begin cooking/i })
await beginBtn.click()
await desktop.waitForTimeout(2300)
const timerText = await desktop.locator('body').textContent()
check('recipe timer running', timerText.includes('elapsed'))

await browser.close()

let failed = 0
for (const r of results) {
  if (!r.ok) failed++
  console.log(`${r.ok ? 'PASS' : 'FAIL'} ${r.name}${r.detail ? ` — ${r.detail}` : ''}`)
}
if (failed) process.exit(1)
console.log(`\n${results.length - failed}/${results.length} checks passed.`)
