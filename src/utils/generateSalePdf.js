import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function generateSalePdf(sale) {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("SOKI", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Venta #${sale.id}`, 14, 35);
  doc.text(`Fecha: ${sale.date}`, 14, 42);

  autoTable(doc, {
    startY: 50,
    head: [["Producto", "Cant.", "Precio", "Subtotal"]],
    body: sale.items.map((item) => [
      item.name,
      item.quantity,
      `$${item.price}`,
      `$${item.price * item.quantity}`,
    ]),
  });

  doc.save(`Venta-${sale.id}.pdf`);
}