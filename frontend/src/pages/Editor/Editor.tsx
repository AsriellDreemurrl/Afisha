import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Editor.module.css";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import { useNavigate, useParams } from "react-router-dom";
import type { AfishaEvent, Category } from "../../types/Event";
import axios from "axios";
import { parseDate } from "../../utils/dateUtils";
import Decimal from "decimal.js";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "../../components/FormInput/FormInput";
import FormTextarea from "../../components/FormTextarea/FormTextarea";
import FormSelect from "../../components/FormSelect/FormSelect";
import FormDatePicker from "../../components/FormDatePicker/FormDatePicker";
import Button from "../../components/Button/Button";

registerLocale("ru", ru);

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "Концерт", label: "Концерт" },
  { value: "Лекция", label: "Лекция" },
  { value: "Спорт", label: "Спорт" },
  { value: "Выставка", label: "Выставка" },
  { value: "Другое", label: "Другое" },
];

function checkPrice(value: any) {
  if (!value || typeof value !== "string") return false;
  try {
    const fixedValue = value.replace(",", ".");
    const decimalNumber = new Decimal(fixedValue);
    return decimalNumber.greaterThan(0);
  } catch (e) {
    return false;
  }
}

const schema = yup.object().shape({
  name: yup.string().required("Название обязательно для заполнения"),
  description: yup.string().required("Описание обязательно для заполнения"),
  datetime: yup.string().required("Дата и время обязательны"),
  location: yup.string().required("Место проведения обязательно"),
  category: yup
    .string()
    .oneOf(
      ["Концерт", "Лекция", "Спорт", "Выставка", "Другое"],
      "Выберите корректную категорию",
    )
    .required("Категория обязательна"),
  price: yup
    .string()
    .required("Цена обязательна")
    .test("is-decimal", "Цена должна быть числом больше нуля", checkPrice),
  photo: yup
    .string()
    .url("Введите корректную ссылку на фото")
    .required("Ссылка на фото обязательна"),
});

type FormInputs = yup.InferType<typeof schema>;

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      datetime: "",
      location: "",
      category: undefined,
      price: "",
      photo: "",
    },
  });

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/${id}`,
        );
        const event: AfishaEvent = response.data;

        setValue("name", event.name);
        setValue("description", event.description);
        setValue("location", event.location);
        setValue("category", event.category as FormInputs["category"]);
        setValue("price", event.price === undefined ? "" : String(event.price));
        setValue("photo", event.photo);

        if (event.datetime) {
          const parsed = parseDate(event.datetime);
          if (parsed) {
            setValue("datetime", parsed.toISOString());
          }
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setServerError("Не удалось загрузить данные события");
      }
    };
    fetchEvent();
  }, [id, setValue]);

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    setServerError(null);

    try {
      const fixedPrice = data.price.replace(",", ".");
      const priceAsNumber = Number(new Decimal(fixedPrice).toFixed(2));

      const payload: Omit<AfishaEvent, "id"> = {
        ...data,
        category: data.category!,
        price: priceAsNumber,
      };

      if (id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/events/${id}`,
          payload,
        );
        navigate(`/post/${id}`);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/events`,
          payload,
        );
        navigate(`/post/${response.data.id}`);
      }
    } catch (err) {
      console.error("Error saving event:", err);
      setServerError(
        err instanceof Error
          ? err.message
          : "Произошла ошибка при сохранении события",
      );
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.name}>
        {id ? "Редактировать событие" : "Новое событие"}
      </h1>

      {serverError && (
        <div style={{ color: "red", marginBottom: "4px" }}>{serverError}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Название"
          id="name"
          error={errors.name?.message}
          {...register("name")}
        />

        <FormTextarea
          label="Описание"
          id="description"
          error={errors.description?.message}
          {...register("description")}
        />

        <div className={style.aboutinp_wrapper}>
          <div className={style.input_group}>
            <Controller
              control={control}
              name="datetime"
              render={({ field }) => (
                <FormDatePicker
                  label="Дата и время"
                  id="datetime"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date: Date | null) =>
                    field.onChange(date ? date.toISOString() : "")
                  }
                  showTimeSelect
                  dateFormat="Pp"
                  error={errors.datetime?.message}
                />
              )}
            />
          </div>
          <div className={style.input_group}>
            <FormInput
              label="Место"
              id="location"
              error={errors.location?.message}
              {...register("location")}
            />
          </div>
        </div>

        <div className={style.aboutinp_wrapper}>
          <div className={style.input_group}>
            <FormSelect
              label="Категория"
              id="category"
              options={CATEGORY_OPTIONS}
              placeholder="Выберите"
              error={errors.category?.message}
              {...register("category")}
            />
          </div>
          <div className={style.input_group}>
            <FormInput
              label="Цена"
              id="price"
              type="text"
              error={errors.price?.message}
              {...register("price")}
            />
          </div>
        </div>

        <FormInput
          label="Ссылка на фото"
          id="photo"
          type="url"
          error={errors.photo?.message}
          {...register("photo")}
        />

        <div className={style.btnwrapper}>
          <Button type="submit" className={style.btn} disabled={loading}>
            {loading ? "Сохранение..." : "Сохранить"}
          </Button>
          <Button className={style.btn} onClick={() => navigate(-1)}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
