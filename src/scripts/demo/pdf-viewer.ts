import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.min.mjs";

interface HighlightData {
  boundingBox: {
    Left: number;
    Top: number;
    Width: number;
    Height: number;
  };
}

function isHighlightData(value: unknown): value is HighlightData {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const { boundingBox } = value as Partial<HighlightData>;

  return (
    typeof boundingBox === "object" &&
    typeof boundingBox.Left === "number" &&
    typeof boundingBox.Top === "number" &&
    typeof boundingBox.Width === "number" &&
    typeof boundingBox.Height === "number"
  );
}

async function initDemoPdfViewer(): Promise<void> {
  const stage = document.querySelector<HTMLElement>(".demo-pdf-stage");

  if (stage === null) {
    return;
  }

  const { dataset } = stage
  const { pdfUrl, pageNumber: pageNumberValue, highlight } = dataset;

  if (pdfUrl === undefined || pdfUrl === "") {
    return;
  }

  const pageNumber =
    pageNumberValue === undefined || pageNumberValue === ""
      ? 1
      : Number(pageNumberValue);

  const canvas = document.createElement("canvas");
  canvas.style.display = "block";

  stage.innerHTML = "";
  stage.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  if (ctx === null) {
    return;
  }

  const pdf = await pdfjsLib.getDocument({ url: pdfUrl }).promise;
  const page = await pdf.getPage(pageNumber);

  const { clientWidth: stageWidth } = stage;
  const unscaledViewport = page.getViewport({ scale: 1 });
  const { width: unscaledWidth } = unscaledViewport;
  const scale = stageWidth / unscaledWidth;
  const viewport = page.getViewport({ scale });

  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);

  await page.render({
    canvas,
    canvasContext: ctx,
    viewport,
  }).promise;

  const parsedHighlight: unknown =
    highlight === undefined || highlight === "" ? null : JSON.parse(highlight);

  if (!isHighlightData(parsedHighlight)) {
    return;
  }

  const { boundingBox } = parsedHighlight;

  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.left = `${boundingBox.Left * canvas.width}px`;
  overlay.style.top = `${boundingBox.Top * canvas.height}px`;
  overlay.style.width = `${boundingBox.Width * canvas.width}px`;
  overlay.style.height = `${boundingBox.Height * canvas.height}px`;
  overlay.style.border = "2px solid red";
  overlay.style.pointerEvents = "none";

  stage.style.position = "relative";
  stage.appendChild(overlay);
}

void initDemoPdfViewer();