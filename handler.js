const { execSync } = require('child_process')

module.exports.runTest = async event => {
  console.log("event: ", event)
  try {
    // const { testMatch } = event.body
    // if (typeof testMatch === undefined) {
    //   return {
    //     statusCode: 400,
    //     body: JSON.stringify('No test file matched!')
    //   }
    // }

    const results = execSync(`npx playwright test ${event.filename}`, { encoding: "utf-8" })

    console.log("results: ", results)

    // const { results } = await runCLI({
    //   ...jestConfig,
    //   testMatch: [testMatch]
    // }, [''])

    return {
      statusCode: 200,
      body: JSON.stringify(results)
    }
  } catch (error) {
    console.error({ error });
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
