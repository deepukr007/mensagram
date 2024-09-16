import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FoodSelectUpload({
  dishes,
  selectCallback,
}: {
  dishes: any[] | null;
  selectCallback: any;
}) {
  const onSelectDish = (value: any) => {
    console.log(value);
    selectCallback(value);
  };

  return (
    <Select onValueChange={onSelectDish}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select the dish" />
      </SelectTrigger>
      <SelectContent className="max-w-[250px] text-xs overflow-y-scroll">
        <SelectGroup>
          <SelectLabel>Dishes</SelectLabel>

          {dishes &&
            dishes.map((dish: any) => (
              <SelectItem
                key={dish.id}
                className="whitespace-normal py-2 text-xs"
                value={dish.id}
              >
                {dish.title}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
