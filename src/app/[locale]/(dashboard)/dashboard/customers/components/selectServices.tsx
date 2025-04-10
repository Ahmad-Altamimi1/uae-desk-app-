import { useForm, useFieldArray, Controller } from "react-hook-form";

const MyForm = () => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      items: [{ name: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-3">
          <input {...register(`items.${index}.name`)} placeholder="Item Name" />
          <input
            type="number"
            {...register(`items.${index}.quantity`)}
            placeholder="Quantity"
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={() => append({ name: "", quantity: 1 })}>
        Add Item
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};
