import { Button, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import OrderAutocompleteFormItem from 'src/view/order/autocomplete/OrderAutocompleteFormItem';
import LMap from 'src/view/map/LMap';
const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.aoi.fields.name'),
    {
      required: true,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.aoi.fields.description'),
    {},
  ),
  geojson: yupFormSchemas.string(
    i18n('entities.aoi.fields.geojson'),
    {
      required: true,
    },
  ),
  estTimeComplete: yupFormSchemas.integer(
    i18n('entities.aoi.fields.estTimeComplete'),
    {},
  ),
  orders: yupFormSchemas.relationToMany(
    i18n('entities.aoi.fields.orders'),
    {},
  ),
});

function AoiForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      description: record.description,
      geojson: record.geojson,
      estTimeComplete: record.estTimeComplete,
      orders: record.orders || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  const { saveLoading, modal } = props;

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid item lg={7} md={8} sm={12} xs={12}>
            <LMap />
          </Grid>
          <Grid spacing={2} container>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <InputFormItem
                name="name"
                label={i18n('entities.aoi.fields.name')}
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <TextAreaFormItem
                name="description"
                label={i18n(
                  'entities.aoi.fields.description',
                )}
                placeholder={i18n(
                  'entities.aoi.placeholders.description',
                )}
                required={false}
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <InputFormItem
                name="geojson"
                label={i18n('entities.aoi.fields.geojson')}
                required={true}
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <InputNumberFormItem
                name="estTimeComplete"
                label={i18n(
                  'entities.aoi.fields.estTimeComplete',
                )}
                required={false}
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <OrderAutocompleteFormItem
                name="orders"
                label={i18n('entities.aoi.fields.orders')}
                required={false}
                showCreate={!props.modal}
                mode="multiple"
              />
            </Grid>
          </Grid>
          <FormButtons
            style={{
              flexDirection: modal
                ? 'row-reverse'
                : undefined,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              startIcon={<SaveIcon />}
              size="small"
            >
              {i18n('common.save')}
            </Button>

            <Button
              disabled={saveLoading}
              onClick={onReset}
              type="button"
              startIcon={<UndoIcon />}
              size="small"
            >
              {i18n('common.reset')}
            </Button>

            {props.onCancel ? (
              <Button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                type="button"
                startIcon={<CloseIcon />}
                size="small"
              >
                {i18n('common.cancel')}
              </Button>
            ) : null}
          </FormButtons>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default AoiForm;
