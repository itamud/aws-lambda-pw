// import * as path from "path"
import { chromium, FullConfig } from "@playwright/test"
import { chromiumLaunchOptions } from "./playwright.config"

const loginUrlMap = {
  prod: "https://passport1.clickpaas.com/#/login?redirect=https%3A%2F%2Fapp.clickpaas.com&redirectFullUrl=https%253A%252F%252Fapp.clickpaas.com%252F%2523%252F",
  lab: "https://passport.lab.clickpaas.com/#/login?redirect=https%3A%2F%2Fapp.lab.clickpaas.com",
  dev: "https://passport.dev3.clickpaas.com/#/login?redirect=https%3A%2F%2Fapp.dev3.clickpaas.com&redirectFullUrl=https%253A%252F%252Fapp.dev3.clickpaas.com%252F%2523%252F",
}

async function globalSetup(config: FullConfig) {
  const { storageState } = config.projects[0].use
  const browser = await chromium.launch(chromiumLaunchOptions)
  // const browser = await chromium.launch({ headless: false })
  const loginPage = await browser.newPage()
  // login
  const userinfo = await import("./userinfo.json")
  await Promise.all([
    loginPage.waitForNavigation(),
    loginPage.goto(loginUrlMap[userinfo.env]),
  ])
  await loginPage.fill(`#username`, userinfo.username)
  await loginPage.fill(`#password`, userinfo.password)
  await Promise.all([
    loginPage.waitForNavigation(),
    loginPage.click(
      `.clickpaas .clickpaas-pages-login-index-page .submit-button`
    ),
  ])

  // Save signed-in state to `storageState.json`.
  await loginPage.context().storageState({ path: storageState as string })

  await browser.close()
}

export default globalSetup
