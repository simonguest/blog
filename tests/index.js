const express = require("express");
const app = express();
const path = require("path");
const { assert } = require("chai");
const puppeteer = require("puppeteer");

const URL = "http://localhost:8888";

const buildUrl = (path) => {
  return `${URL}${path}?test=true`;
};

let server;

before(async () => {
  app.get("/*(.js|.css|.md)", express.static("."));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..") + "/index.html");
  });
  global.browser = await puppeteer.launch({
    headless: true
  });
  global.page = await browser.newPage();
  server = app.listen(8888);
});

describe("Navigation tests", () => {
  it("should have a title", async () => {
    await global.page.goto(buildUrl("/"));
    await global.page.waitForSelector("#title");
    let heading = await global.page.evaluate(() => {
      return document.querySelector("#title").innerText;
    });
    assert(heading === "Simon Guest", "Expected heading to contain name");
  });

  it("should have four navigation links", async () => {
    await global.page.goto(buildUrl("/"));
    await global.page.waitForSelector("nav");
    const links = await global.page.evaluate(() => {
      return document.querySelectorAll("nav > blog-link").length;
    });
    assert(links === 4, "Expected four navigation links in page (inc. title)");
  });

  it("should display article summaries after navigating to /articles", async () => {
    await global.page.goto(buildUrl("/articles"));
    await global.page.waitForSelector("a.summary-title");
    const summaries = await global.page.evaluate(() => {
      return document.querySelectorAll("a.summary-title").length;
    });
    assert(summaries === 4, "Expected four summary links in page");
  });

  it("should display article summaries after clicking on articles link", async () => {
    await global.page.goto(buildUrl("/presentations"));
    await global.page.click("nav > blog-link:nth-child(1)");
    await global.page.waitForSelector("a.summary-title");
    const summaries = await global.page.evaluate(() => {
      return document.querySelectorAll("a.summary-title").length;
    });
    assert(summaries === 4, "Expected four summary links in page");
  });

  it("should display presentation summaries after navigating to /presentations", async () => {
    await global.page.goto(buildUrl("/presentations"));
    await global.page.waitForSelector("a.summary-title");
    const summaries = await global.page.evaluate(() => {
      return document.querySelectorAll("a.summary-title").length;
    });
    assert(summaries === 3, "Expected three summary links in page");
  });

  it("should display presentation summaries after clicking on presentations link", async () => {
    await global.page.goto(buildUrl("/"));
    await global.page.click("nav > blog-link:nth-child(2)");
    await global.page.waitForSelector("a.summary-title");
    const summaries = await global.page.evaluate(() => {
      return document.querySelectorAll("a.summary-title").length;
    });
    assert(summaries === 3, "Expected three summary links in page");
  });

  it("should display project summaries after navigating to /projects", async () => {
    await global.page.goto(buildUrl("/projects"));
    await global.page.waitForSelector("a.summary-title");
    const summaries = await global.page.evaluate(() => {
      return document.querySelectorAll("a.summary-title").length;
    });
    assert(summaries === 2, "Expected two summary links in page");
  });

  it("should display project summaries after clicking on projects link", async () => {
    await global.page.goto(buildUrl("/"));
    await global.page.click("nav > blog-link:nth-child(3)");
    await global.page.waitForSelector("a.summary-title");
    const summaries = await global.page.evaluate(() => {
      return document.querySelectorAll("a.summary-title").length;
    });
    assert(summaries === 2, "Expected two summary links in page");
  });

  it("should display the about page after navigating to /about", async () => {
    await global.page.goto(buildUrl("/about"));
    await global.page.waitForSelector("p#article-title");
    const articles = await global.page.evaluate(() => {
      return document.querySelectorAll("p#article-title").length;
    });
    assert(articles === 1, "Expected one article in page");
  });

  it("should display the about page after clicking on about link", async () => {
    await global.page.goto(buildUrl("/"));
    await global.page.click("nav > blog-link:nth-child(4)");
    await global.page.waitForSelector("p#article-title");
    const articles = await global.page.evaluate(() => {
      return document.querySelectorAll("p#article-title").length;
    });
    assert(articles === 1, "Expected one article in page");
  });
});

after(async function () {
  await global.browser.close();
  server.close();
});
