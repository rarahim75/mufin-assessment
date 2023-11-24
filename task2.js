
const PDFDocument = require('pdf-lib').PDFDocument;
const fs = require('fs');

  /* 
    Task 2 was straightforward and i had no issue completing it.
  */
 
async function Task2() {

  console.log("Starting Task2...");

  try {
    const mergedPdf = await PDFDocument.create();

    const pdfA = await PDFDocument.load(fs.readFileSync(".\\files\\demo_123a.pdf"));
    const pdfB = await PDFDocument.load(fs.readFileSync(".\\files\\demo_123b.pdf"));
  
    const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
    copiedPagesA.forEach((page) => mergedPdf.addPage(page));
  
    const copiedPagesB = await mergedPdf.copyPages(pdfB, pdfB.getPageIndices());
    copiedPagesB.forEach((page) => mergedPdf.addPage(page));
  
    const mergedPdfFile = await mergedPdf.save();
  
    fs.writeFileSync(".\\files\\demo_123_merged.pdf", mergedPdfFile);
    console.log("Files merged.");

  } catch (error) {
      console.error(error);
  } finally{
    console.log("Done.");
  }
}

Task2();