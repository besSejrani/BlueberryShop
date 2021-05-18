// Express
import express from "express";

import fs from "fs";
import path from "path";
import PDFKit from "pdfkit";

// ========================================================================================================

const router = express.Router();

router.get("/pdf", async (_, res) => {
  const invoiceName = "invoice.pdf";
  const invoicePath = path.join("data", "invoices", invoiceName);

  const doc = await new PDFKit({ size: "A4", compress: true });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=${invoiceName}`);

  doc.pipe(fs.createWriteStream(invoicePath));
  doc.pipe(res);

  // Logo
  doc.image("Pdf/images/raspberry.png", 30, 25, { width: 36, height: 40 });

  // Logo Text
  doc.fontSize(16).text("BlueberryShop", 75, 40, {
    width: 400,
  });

  // Invoice ID
  doc.fontSize(18).text("Invoice #", 0, 36, {
    width: 560,
    align: "right",
  });

  //
  // Billing Address
  //

  doc.fontSize(13).text("Billing Adress", 30, 125, {
    width: 400,
  });

  doc.fontSize(13).text("Billing Adress", 30, 125, {
    width: 400,
  });

  doc.fontSize(11).text("Last Name, First Name", 30, 150, {
    width: 400,
  });

  doc.fontSize(11).text("Address", 30, 168, {
    width: 400,
  });

  doc.fontSize(11).text("City, Zip", 30, 186, {
    width: 400,
  });

  doc.fontSize(11).text("Country", 30, 204, {
    width: 400,
  });

  //
  // Company Address
  //

  doc.fontSize(13).text("Company Adress", 30, 125, {
    width: 530,
    align: "right",
  });

  doc.fontSize(13).text("Company Adress", 30, 125, {
    width: 530,
    align: "right",
  });

  doc.fontSize(11).text("Last Name, First Name", 30, 150, {
    width: 530,
    align: "right",
  });

  doc.fontSize(11).text("Address", 30, 168, {
    width: 530,
    align: "right",
  });

  doc.fontSize(11).text("City, Zip", 30, 186, {
    width: 530,
    align: "right",
  });

  doc.fontSize(11).text("Country", 30, 204, {
    width: 530,
    align: "right",
  });

  //
  // Shipping Address
  //

  doc.fontSize(13).text("Shipping Adress", 30, 260, {
    width: 400,
  });

  doc.fontSize(13).text("Shipping Adress", 30, 260, {
    width: 400,
  });

  doc.fontSize(11).text("Last Name, First Name", 30, 285, {
    width: 400,
  });

  doc.fontSize(11).text("Address", 30, 303, {
    width: 400,
  });

  doc.fontSize(11).text("City, Zip", 30, 321, {
    width: 400,
  });

  doc.fontSize(11).text("Country", 30, 339, {
    width: 400,
  });

  //
  // Order Information 1
  //

  doc.fontSize(11).text("Order Number:", 30, 400, {
    width: 400,
  });

  doc.fontSize(11).text("Order Number:", 30, 400, {
    width: 400,
  });

  doc.fontSize(11).text("UUID", 130, 400, {
    width: 400,
  });

  doc.fontSize(11).text("Order Date: ", 30, 430, {
    width: 400,
  });

  doc.fontSize(11).text("Order Date: ", 30, 430, {
    width: 400,
  });

  doc.fontSize(11).text("18.05.2021", 130, 430, {
    width: 400,
  });

  //
  // Order Information 2
  //

  doc.fontSize(11).text("Invoice Number:", 260, 400, {
    width: 400,
  });

  doc.fontSize(11).text("Invoice Number:", 260, 400, {
    width: 400,
  });

  doc.fontSize(11).text("UUID", 360, 400, {
    width: 400,
  });

  doc.fontSize(11).text("Invoice Date:", 260, 430, {
    width: 400,
  });

  doc.fontSize(11).text("Invoice Date:", 260, 430, {
    width: 400,
  });

  doc.fontSize(11).text("18.05.2021", 360, 430, {
    width: 400,
  });

  //
  // Order Details Header
  //

  doc.fontSize(10).text("Product", 40, 477, {
    width: 400,
  });

  doc.fontSize(10).text("Product", 40, 477, {
    width: 400,
  });

  doc.fontSize(10).text("Quantity", 290, 477, {
    width: 400,
  });

  doc.fontSize(10).text("Quantity", 290, 477, {
    width: 400,
  });

  doc.fontSize(10).text("Unit Price", 390, 477, {
    width: 400,
  });

  doc.fontSize(10).text("Unit Price", 390, 477, {
    width: 400,
  });

  doc.fontSize(10).text("Total Price", 490, 477, {
    width: 400,
  });

  doc.fontSize(10).text("Total Price", 490, 477, {
    width: 400,
  });

  doc.polygon([260, 460], [260, 640]);
  doc.stroke();

  doc.polygon([360, 460], [360, 640]);
  doc.stroke();

  doc.polygon([465, 460], [465, 640]);
  doc.stroke();

  doc.polygon([30, 460], [565, 460], [565, 500], [30, 500]);
  doc.stroke();

  //
  // Order Details Body
  //

  doc.polygon([30, 500], [565, 500], [565, 640], [30, 640]);
  doc.stroke();

  //
  // Order Products Name
  //

  doc.fontSize(10).text("Raspberry PI 4", 40, 525, {
    width: 400,
  });

  doc.fontSize(10).text("Compute Module 4", 40, 555, {
    width: 400,
  });

  doc.fontSize(10).text("PI Camera", 40, 585, {
    width: 400,
  });

  doc.fontSize(10).text("Raspberry PI Touch Screen", 40, 615, {
    width: 400,
  });

  //
  // Order Products Quantity
  //

  doc.fontSize(10).text("1", 290, 525, {
    width: 400,
  });

  doc.fontSize(10).text("1", 290, 555, {
    width: 400,
  });

  doc.fontSize(10).text("1", 290, 585, {
    width: 400,
  });

  doc.fontSize(10).text("1", 290, 615, {
    width: 400,
  });

  //
  // Order Products Unit Price
  //

  doc.fontSize(10).text("10.-", 405, 525, {
    width: 400,
  });

  doc.fontSize(10).text("20.-", 405, 555, {
    width: 400,
  });

  doc.fontSize(10).text("30.-", 405, 585, {
    width: 400,
  });

  doc.fontSize(10).text("40.-", 405, 615, {
    width: 400,
  });

  //
  // Order Products Total Price
  //

  doc.fontSize(10).text("10.-", 520, 525, {
    width: 400,
  });

  doc.fontSize(10).text("20.-", 520, 555, {
    width: 400,
  });

  doc.fontSize(10).text("30.-", 520, 585, {
    width: 400,
  });

  doc.fontSize(10).text("40.-", 520, 615, {
    width: 400,
  });

  //
  // Order Total Lines
  //

  doc.polygon([260, 680], [565, 680]);
  doc.stroke();

  doc.polygon([260, 740], [565, 740]);
  doc.stroke();

  //
  // Order Total
  //

  doc.fontSize(11).text("Price Total", 260, 660, {
    width: 400,
  });

  doc.fontSize(11).text("Price Total", 260, 660, {
    width: 400,
  });

  doc.fontSize(10).text("100.-", 515, 660, {
    width: 400,
  });

  doc.fontSize(10).text("100.-", 515, 660, {
    width: 400,
  });

  doc.fontSize(11).text("Taxes", 260, 690, {
    width: 400,
  });

  doc.fontSize(11).text("Taxes", 260, 690, {
    width: 400,
  });

  doc.fontSize(11).text("7.7%", 395, 690, {
    width: 400,
  });

  doc.fontSize(11).text("7.7%", 395, 690, {
    width: 400,
  });

  doc.fontSize(10).text("7.7.-", 517, 690, {
    width: 400,
  });

  doc.fontSize(10).text("7.7.-", 517, 690, {
    width: 400,
  });

  doc.fontSize(11).text("Stripe Fees", 260, 720, {
    width: 400,
  });

  doc.fontSize(11).text("Stripe Fees", 260, 720, {
    width: 400,
  });

  doc.fontSize(11).text("2.9%", 395, 720, {
    width: 400,
  });

  doc.fontSize(11).text("2.9%", 395, 720, {
    width: 400,
  });

  doc.fontSize(10).text("2.9.-", 517, 720, {
    width: 400,
  });

  doc.fontSize(10).text("2.9.-", 517, 720, {
    width: 400,
  });

  doc.fontSize(11).text("Total", 260, 755, {
    width: 400,
  });

  doc.fontSize(11).text("Total", 260, 755, {
    width: 400,
  });

  doc.fontSize(10).text("110.05.-", 500, 755, {
    width: 400,
  });

  doc.fontSize(10).text("110.05.-", 500, 755, {
    width: 400,
  });

  doc.end();
});

export default router;
