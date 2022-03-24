
const { test, expect } = require("@playwright/test")

test.describe(`新建对象分类`, () => {
  test(`新建对象分类-基础对象`, async ({ context, page }) => {

    // 打开页面{https://app-admin.clickpaas.com/#/home}


    await Promise.all([
      page.waitForNavigation(),
      page.goto("https://app-admin.clickpaas.com/#/home"),
    ])


    if (!await page.$(".hekit-ui-menu-submenu-open > .hekit-ui-menu-submenu-title :text-is('应用配置')")) {
      await page.click(".hekit-ui-menu-submenu :text-is('应用配置')")
    }

    if (!await page.$(".hekit-ui-menu-item-selected :text-is('对象管理器')")) {
      await page.click(".hekit-ui-menu-item :text-is('对象管理器')")
    }



    const target_locator_a8SlYUduVp = page.locator(".node-box .node-icon-title >> nth=1")
    await target_locator_a8SlYUduVp.click()


    const input_locator_gS9wVf5nW5 = page.locator(".hekit-ui-form-item-label:has-text('分类名称') + .hekit-ui-form-item-control .hekit-ui-input")
    await input_locator_gS9wVf5nW5.fill("基础对象")


    const modal_locator_A2F8vJIgbu = page.locator(".hekit-ui-modal-root:has-text('新建对象分类')")
    const modal_button_locator_A2F8vJIgbu = modal_locator_A2F8vJIgbu.locator(".hekit-ui-btn:has-text('确 定')")
    await modal_button_locator_A2F8vJIgbu.click()



    await expect(page.locator(".node-title[title='基础对象']")).toBeVisible()

  })
})