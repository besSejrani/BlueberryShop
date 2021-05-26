// Express
import express from "express";

// PDF
import PDFKit from "pdfkit";

// Moment
import moment from "moment";

// Database
import { OrderModel } from "@Model/Order";

// ========================================================================================================

const router = express.Router();

router.get("/:id/pdf", async (req, res) => {
  const { id } = req.params;

  const doc = await new PDFKit({ size: "A4", compress: true });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=order");

  doc.pipe(res);

  const order = await OrderModel.findOne({ _id: id }).populate({
    path: "cart",
  });

  // Logo
  doc.image("PDF/images/raspberry.png", 30, 25, { width: 36, height: 40 });

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

  doc.fontSize(13).text("Billing Adress", 30, 90, {
    width: 530,
    align: "right",
  });

  doc.fontSize(11).text(
    `${order?.fullName
      ?.trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}`,
    30,
    120,
    {
      width: 530,
      align: "right",
    },
  );

  doc.fontSize(11).text(`${order?.billing?.address}`, 30, 138, {
    width: 530,
    align: "right",
  });

  doc.fontSize(11).text(`${order?.billing?.city} ${order?.billing?.zip}`, 30, 156, {
    width: 530,
    align: "right",
  });

  doc.fontSize(11).text(`${order?.billing?.country}`, 30, 174, {
    width: 530,
    align: "right",
  });

  //
  // Company Address
  //

  doc.fontSize(13).text("Company Adress", 30, 90, {
    width: 530,
  });

  doc.fontSize(11).text("BlueberryShop SA", 30, 120, {
    width: 530,
  });

  doc.fontSize(11).text("Avenue Sainte-Croix 10", 30, 138, {
    width: 530,
  });

  doc.fontSize(11).text("Switzerland", 30, 156, {
    width: 530,
  });

  //
  // Shipping Address
  //

  doc.fontSize(13).text("Shipping Adress", 30, 210, {
    width: 530,
    align: "right",
  });

  doc.fontSize(11).text(
    `${order?.fullName
      ?.trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}`,
    30,
    240,
    {
      width: 530,
      align: "right",
    },
  );

  doc.fontSize(11).text(`${order?.shipping?.address}`, 30, 258, {
    width: 530,
    align: "right",
  });

  doc.fontSize(11).text(`${order?.shipping?.city} ${order?.shipping?.zip}`, 30, 276, {
    width: 530,
    align: "right",
  });

  doc.fontSize(11).text(`${order?.shipping?.country}`, 30, 294, {
    width: 530,
    align: "right",
  });

  //
  // Order Information 1
  //

  doc.fontSize(11).text("Order Number:", 30, 350, {
    width: 400,
  });

  doc.fontSize(11).text("356066c2-dbee", 130, 350, {
    width: 400,
  });

  doc.fontSize(11).text("Order Date: ", 30, 370, {
    width: 400,
  });

  doc.fontSize(11).text(`${moment(order?.createdAt).format("DD.MM.yyyy")}`, 130, 370, {
    width: 400,
  });

  //
  // Order Information 2
  //

  doc.fontSize(11).text("Invoice Number:", 260, 350, {
    width: 400,
  });

  doc.fontSize(11).text("356066c2-dbee", 360, 350, {
    width: 400,
  });

  doc.fontSize(11).text("Invoice Date:", 260, 370, {
    width: 400,
  });

  doc.fontSize(11).text(`${moment(order?.createdAt).format("DD.MM.yyyy")}`, 360, 370, {
    width: 400,
  });

  //
  // Order Details Header
  //

  doc.polygon([30, 400], [565, 400], [565, 440], [30, 440]);
  doc.stroke();

  doc.fontSize(10).text("Product", 40, 413, {
    width: 400,
  });

  doc.fontSize(10).text("Quantity", 290, 413, {
    width: 400,
  });

  doc.fontSize(10).text("Unit Price", 390, 413, {
    width: 400,
  });

  doc.fontSize(10).text("Total Price", 490, 413, {
    width: 400,
  });

  //
  // Order Details Body
  //

  const products = order?.cart?.length;
  const base = 435;
  const height = 31 * products!;
  const lineHeight = base + height;

  doc.polygon([30, 400], [565, 400], [565, lineHeight], [30, lineHeight]);
  doc.stroke();

  doc.polygon([260, 400], [260, lineHeight]);
  doc.stroke();

  doc.polygon([360, 400], [360, lineHeight]);
  doc.stroke();

  doc.polygon([465, 400], [465, lineHeight]);
  doc.stroke();

  order?.cart?.map((product, index) => {
    const productHeight = 450;
    const space = index * 30;
    const height = space + productHeight;

    doc.fontSize(10).text(`${product.name}`, 40, height, {
      width: 400,
    });

    doc.fontSize(10).text("1", 290, height, {
      width: 400,
    });

    doc.fontSize(10).text(`${product.price}.-`, 405, height, {
      width: 400,
    });

    doc.fontSize(10).text(`${product.price}.-`, 520, height, {
      width: 400,
    });
  });

  //
  // Order Total
  //

  doc.fontSize(11).text("Price Total", 260, lineHeight + 30, {
    width: 275,
    align: "left",
    continued: true,
  });

  doc.fontSize(11).text(`${order?.amount}.-`, { align: "right" }).moveDown().moveDown();

  doc.fontSize(11).text("Taxes", { width: 275, align: "left", continued: true });

  doc.fontSize(11).text("7.7%", { align: "center", continued: true });

  doc.fontSize(11).text("7.7.-", { align: "right" }).moveDown();

  doc.fontSize(11).text("Stripe Fees", { width: 245, align: "left", continued: true });

  doc.fontSize(11).text("2.9%", { align: "center" }).moveUp();

  doc.fontSize(11).text("2.9.-", { width: 275, align: "right" }).moveDown().moveDown();

  doc.fontSize(11).text("Total", { width: 275, align: "left", continued: true });

  doc.fontSize(11).text(`${order?.amount}.-`, { align: "right" });

  if (products! >= 10) {
    doc.polygon([260, 95], [565, 95]);
    doc.stroke();
  } else {
    doc.polygon([260, lineHeight + 55], [565, lineHeight + 55]);
    doc.stroke();
  }

  if (products! >= 10) {
    doc.polygon([260, 155], [565, 155]);
    doc.stroke();
  } else {
    doc.polygon([260, lineHeight + 115], [565, lineHeight + 115]);
    doc.stroke().moveDown();
  }

  doc.end();
});

export default router;
