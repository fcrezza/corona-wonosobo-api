import retry from "@vercel/fetch-retry";
import fetch from "node-fetch";
import $ from "cheerio";
import rootCas from "ssl-root-cas/latest";
import https from "https";
import {join} from "path";

const fetcher = retry(fetch);
const baseUrl = "https://coronawonosobo-api.fcrezza.com/api";
https.globalAgent.options.ca = rootCas.create();
rootCas.addFile(join(__dirname, "/..", "/intermediate.pem"));

async function getPage() {
  const sourceUrl = "https://corona.wonosobokab.go.id/";
  const res = await fetcher(sourceUrl);
  const page = await res.text();
  return page;
}

function getDate(page) {
  const text = $("center:nth-child(2) .label.label-primary", page).text();
  const raw = text.split(" ")[1];
  const parseDate = raw.split("-").reverse().join("/");
  return parseDate;
}

export async function getMainData() {
  const page = await getPage();
  const result = {};
  const keys = ["odr", "suspect", "probable", "positive"];
  const container = $(".inner center", page);
  const data = $("h2", container).map((_, e) => $(e).text());

  for (let idx = 0; idx < keys.length; idx++) {
    result[keys[idx]] = {
      value: Number(data[idx].replace(",", "")),
      detail: `${baseUrl}/${keys[idx]}`
    };
  }

  result.lastUpdate = getDate(page);
  return result;
}

export async function getDetail({containerSelector, keys, totalSelector}) {
  const page = await getPage();
  const container = $(containerSelector, page).next();
  const data = $("b", container).map((_, e) => $(e).text());
  const total = $(totalSelector, page).text();
  const result = {};

  for (let idx = 0; idx < keys.length; idx++) {
    result[keys[idx]] = Number(data[idx].replace(",", ""));
  }

  result.total = Number(total.replace(",", ""));
  result.lastUpdate = getDate(page);
  return result;
}

export async function getRegions() {
  const props = ["name", "odp", "pdp", "positive"];
  const page = await getPage();
  const rows = $("#accordion1", page).toArray();
  const result = [];
  rows.forEach((row) => {
    const regions = {};
    const tds = $("td:not(:first-child)", row).map((_, td) => $(td).text());
    for (let idx = 0; idx < props.length; idx++) {
      if (idx) {
        regions[props[idx]] = Number(tds[idx].replace(",", ""));
        continue;
      }

      regions[props[idx]] = tds[idx].toLowerCase().replace(" ", "-");
      regions.detail = `${baseUrl}/regions/${regions.name}`;
      result.push(regions);
    }
  });

  return {
    data: result,
    lastUpdate: getDate(page)
  };
}

export async function getRegion(name) {
  const page = await getPage();
  const props = ["name", "positive", "recovered", "death"];
  const tables = $("#container > #tableMain", page).toArray();
  let rowIdx = 0;
  const result = [];

  for (let idx = 0; idx < tables.length; idx++) {
    const regionName = $("td:nth-child(2)", tables[idx])
      .text()
      .toLowerCase()
      .replace(" ", "-");

    if (regionName === name) {
      rowIdx = idx;
      break;
    }
  }

  if (!rowIdx) {
    return {
      data: null
    };
  }

  const container = $(tables[rowIdx]).next(".collapse");
  if (container.length) {
    const rows = $("tr:nth-child(even)", container).toArray();
    rows.forEach((row) => {
      const tds = $("td:not(:first-child)", row).map((_, td) => $(td).text());
      const region = {};
      for (let idx = 0; idx < props.length; idx++) {
        if (idx) {
          region[props[idx]] = Number(tds[idx].replace(",", ""));
          continue;
        }

        region[props[idx]] = tds[idx].toLowerCase().replace(" ", "");
      }
      result.push(region);
    });

    return {
      data: result,
      lastUpdate: getDate(page)
    };
  }

  const region = {};
  const tds = $("td:not(:first-child)", tables[rowIdx]).map((_, td) =>
    $(td).text()
  );

  for (let idx = 0; idx < props.length; idx++) {
    if (idx) {
      region[props[idx]] = Number(tds[idx].replace(",", ""));
      continue;
    }

    region[props[idx]] = tds[idx].toLowerCase().replace(" ", "-");
  }

  result.push(region);
  return {
    data: result,
    lastUpdate: getDate(page)
  };
}
