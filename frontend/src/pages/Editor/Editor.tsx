import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Editor.module.css";
import { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { useNavigate, useParams } from 'react-router-dom';
import type { AfishaEvent } from '../../types/Event';
import axios from 'axios';
import { parseDate } from '../../utils/dateUtils';
import { createUrl } from '../../utils/url';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

registerLocale('ru', ru);

const schema = yup.object().shape({
  name: yup.string().required('Название обязательно для заполнения'),
  description: yup.string().required('Описание обязательно для заполнения'),
  datetime: yup.string().required('Дата и время обязательны'),
  location: yup.string().required('Место проведения обязательно'),
  category: yup
    .string()
    .oneOf(['Концерт', 'Лекция', 'Спорт', 'Выставка', 'Другое'], 'Выберите корректную категорию')
    .required('Категория обязательна'),
  price: yup
    .number()
    .typeError('Цена должна быть числом')
    .positive('Цена должна быть больше нуля')
    .required('Цена обязательна'),
  photo: yup.string().url('Введите корректную ссылку на фото').required('Ссылка на фото обязательна'),
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
    watch,
    formState: { errors }
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      datetime: '',
      location: '',
      category: undefined,
      price: undefined,
      photo: ''
    }
  });

  const datetimeValue = watch('datetime');
  const selectedDate = datetimeValue ? new Date(datetimeValue) : null;

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      try {
        const response = await axios.get(createUrl(`/events/${id}`));
        const event: AfishaEvent = response.data;

        setValue('name', event.name ?? '');
        setValue('description', event.description ?? '');
        setValue('location', event.location ?? '');
        setValue('category', event.category as FormInputs['category']);
        setValue('price', event.price ?? 0);
        setValue('photo', event.photo ?? '');

        if (event.datetime) {
          const parsed = parseDate(event.datetime);
          if (parsed) setValue('datetime', parsed.toISOString());
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        setServerError('Не удалось загрузить данные события');
      }
    };
    fetchEvent();
  }, [id, setValue]);

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    setServerError(null);

    try {
      const payload: Omit<AfishaEvent, 'id'> = {
        ...data,
        category: data.category!
      };

      if (id) {
        await axios.put(createUrl(`/events/${id}`), payload);
        navigate(`/post/${id}`);
      } else {
        const response = await axios.post(createUrl('/events'), payload);
        navigate(`/post/${response.data.id}`);
      }
    } catch (err) {
      console.error('Error saving event:', err);
      setServerError(err instanceof Error ? err.message : 'Произошла ошибка при сохранении события');
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.name}>{id ? 'Редактировать событие' : 'Новое событие'}</h1>

      {serverError && <div style={{ color: 'red', marginBottom: '16px' }}>{serverError}</div>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={style.field}>
          <label htmlFor="name" className={style.label}>Название</label>
          <input
            type="text"
            className={errors.name ? `${style.title} ${style.inputError}` : style.title}
            id="name"
            {...register('name')}
          />
          {errors.name && <span className={`${style.errorText} ${style.errorTextName}`}>{errors.name.message}</span>}
        </div>

        <div className={style.field}>
          <label htmlFor="description" className={style.label}>Описание</label>
          <textarea
            className={errors.description ? `${style.description} ${style.inputError}` : style.description}
            id="description"
            {...register('description')}
          />
          {errors.description && <span className={`${style.errorText} ${style.errorTextDescription}`}>{errors.description.message}</span>}
        </div>

        <div className={style.aboutinp_wrapper}>
          <div className={style.input_group}>
            <label htmlFor="datetime" className={style.label}>Дата и время</label>
            <Controller
              control={control}
              name="datetime"
              render={({ field }) => (
                <DatePicker
                  id="datetime"
                  locale="ru"
                  selected={selectedDate}
                  onChange={(date: Date | null) => field.onChange(date ? date.toISOString() : '')}
                  showTimeSelect
                  dateFormat="Pp"
                  className={errors.datetime ? style.inputError : ''}
                />
              )}
            />
            {errors.datetime && <span className={`${style.errorText} ${style.errorTextDatetime}`}>{errors.datetime.message}</span>}
          </div>

          <div className={style.input_group}>
            <label htmlFor="location" className={style.label}>Место</label>
            <input
              type="text"
              className={errors.location ? `${style.aboutinp} ${style.inputError}` : style.aboutinp}
              id="location"
              {...register('location')}
            />
            {errors.location && <span className={`${style.errorText} ${style.errorTextLocation}`}>{errors.location.message}</span>}
          </div>
        </div>

        <div className={style.aboutinp_wrapper}>
          <div className={style.input_group}>
            <label htmlFor="category" className={style.label}>Категория</label>
            <select
              className={errors.category ? `${style.aboutinp} ${style.inputError}` : style.aboutinp}
              id="category"
              defaultValue=""
              {...register('category')}
            >
              <option value="" disabled>Выберите</option>
              <option value="Концерт">Концерт</option>
              <option value="Лекция">Лекция</option>
              <option value="Спорт">Спорт</option>
              <option value="Выставка">Выставка</option>
              <option value="Другое">Другое</option>
            </select>
            {errors.category && <span className={`${style.errorText} ${style.errorTextCategory}`}>{errors.category.message}</span>}
          </div>

          <div className={style.input_group}>
            <label htmlFor="price" className={style.label}>Цена</label>
            <input
              type="number"
              className={errors.price ? `${style.aboutinp} ${style.inputError}` : style.aboutinp}
              id="price"
              {...register('price')}
            />
            {errors.price && <span className={`${style.errorText} ${style.errorTextPrice}`}>{errors.price.message}</span>}
          </div>
        </div>

        <div className={style.field}>
          <label htmlFor="photo" className={style.label}>Ссылка на фото</label>
          <input
            type="url"
            className={errors.photo ? `${style.photo} ${style.inputError}` : style.photo}
            id="photo"
            {...register('photo')}
          />
          {errors.photo && <span className={`${style.errorText} ${style.errorTextPhoto}`}>{errors.photo.message}</span>}
        </div>

        <div className={style.btnwrapper}>
          <button type="submit" className={style.btn} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button type="button" className={style.btn} onClick={() => navigate(-1)}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editor;