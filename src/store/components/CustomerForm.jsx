import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

export default function CustomerForm({
  customer,
  handleChange,
}) {
  return (
    <Card className="p-5 lg:p-8">

      <h2 className="mb-6 text-xl font-semibold lg:mb-8 lg:text-2xl">
        Datos del cliente
      </h2>

      <div className="grid gap-4 lg:gap-5">

        <Input
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Nombre y apellido"
        />

        <Input
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Teléfono"
        />

        <Input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
        />

        <Input
          name="address"
          value={customer.address}
          onChange={handleChange}
          placeholder="Dirección"
        />

        <Input
          name="city"
          value={customer.city}
          onChange={handleChange}
          placeholder="Ciudad"
        />

        <Input
          name="postalCode"
          value={customer.postalCode}
          onChange={handleChange}
          placeholder="Código postal"
        />

      </div>

    </Card>
  );
}