import { chromium } from 'playwright-core'

const EXECUTABLE = process.env.CHROME_BIN

const routes = [
  ['/', 'Beyond The Plate'],
  ['/discover', 'one long table'],
  ['/discover/pho', 'Phở Bò'],
  ['/culture', 'Five moments'],
  ['/nutrition', 'The meal, decoded'],
  ['/recipes', 'Cook alongside us'],
  ['/gallery', 'Frames from the table'],
  ['/about', 'Why we built'],
]

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const errors = []
let failed = 0

for (const [route, expectedText] of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const pageErrors = []
  page.on('pageerror', (err) => pageErrors.push(String(err)))
  page.on('console', (msg) => {
    if (msg.type() === 'error') pageErrors.push(`console: ${msg.text()}`)
  })

  try {
    await page.goto(`http://localhost:5199${route}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    const text = await page.textContent('body')
    const hasText = text.includes(expectedText)
    const title = await page.title()
    console.log(`${hasText ? 'PASS' : 'FAIL'} ${route} (title: "${title}")`)
    if (!hasText) {
      failed++
      errors.push(`${route}: expected "${expectedText}" in body`)
    }
    if (pageErrors.length) {
      failed++
      errors.push(`${route}: ${pageErrors.join(' | ')}`)
    }
  } catch (err) {
    failed++
    errors.push(`${route}: ${String(err)}`)
  }
  await page.close()
}

await browser.close()

if (failed) {
  console.error('\nFAILURES:')
  errors.forEach((err) => console.error(' -', err))
  process.exit(1)
}
console.log(`\nAll ${routes.length} routes rendered without errors.`)
