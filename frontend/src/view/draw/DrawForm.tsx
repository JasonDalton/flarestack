import { Box, Button, Grid, Hidden } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, { FormButtons } from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import Storage from 'src/security/storage';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
//import GeoMap from 'src/view/draw/GeoMap';
const schema = yup.object().shape({
  name: yupFormSchemas.string(i18n('entities.map.fields.name'), {
    required: true,
  }),
  description: yupFormSchemas.string(
    i18n('entities.map.fields.description'),
    {},
  ),
  geojson: yupFormSchemas.string(i18n('entities.map.fields.geojson'), {
    required: true,
  }),
  preview: yupFormSchemas.images(i18n('entities.map.fields.preview'), {
    max: 1,
  }),
});
function HomeForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      name: record.name,
      description: record.description,
      geojson: record.geojson,
      preview: record.preview || [],
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
          <Grid spacing={2} container>
            <Grid item lg={12} xs={12}>
            
            </Grid>
            <Grid item lg={12} xs={12}>
              <InputFormItem
                name="name"
                label={i18n('entities.map.fields.name')}
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item lg={12} xs={12}>
              <TextAreaFormItem
                name="description"
                label={i18n('entities.map.fields.description')}
                placeholder={i18n('entities.map.placeholders.description')}
                required={false}
              />
            </Grid>
            <Box component="div" display="_hidden">
              <Grid item lg={12} xs={12}>
                <InputFormItem
                  name="geojson"
                  label={i18n('entities.map.fields.geojson')}
                  required={true}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <ImagesFormItem
                  name="preview"
                  label={i18n('entities.map.fields.preview')}
                  required={false}
                  storage={Storage.values.mapPreview}
                  max={1}
                />
              </Grid>
            </Box>
          </Grid>
          <FormButtons
            style={{
              flexDirection: modal ? 'row-reverse' : undefined,
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
export default HomeForm;
