const puppeteer = require('puppeteer')
let browser; let page; const list = []; let ready = false

setInterval(async () => {
  if (ready && list.length >= 1) {
    ready = false
    let [r, t, a, b] = list.shift()
    if (`${t.length}` == '0') {
      ready = true
      return r('Empty message!')
    }
    const l = []
    try {
      t.match(/\|(.|\r|\n){1,}\|/g).forEach(w => {
        const k = Math.random().toString(36).slice(2)
        t = t.replace(w, k)
        l.push([k, w])
      })
    } catch {}
    await page.goto(`https://translate.google.com/?sl=${a}&tl=${b}&text=${t}&op=translate`)

    t = await gettr()
    l.forEach(a => t = t.replace(a[0], a[1]))
    ready = true
    r(t)
  }
}, 50)
const gettr = () => {
  return new Promise(async resolve => {
    try {
      const e = await page.$("[class='J0lOec']")
      const t = await page.evaluate(e => e.innerText, e)
      resolve(t.endsWith('verified_user') ? t.slice(0, -'verified_user'.length) : t)
    } catch { gettr().then(resolve) }
  })
}
;(async () => {
  browser = await puppeteer.launch({ headless: false })
  page = await browser.newPage()
  ready = true
})()
module.exports = (a, b, c) => { return new Promise(resolve => list.push([resolve, a, b, c])) }
