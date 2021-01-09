import { Button, Col, Row, Select } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import CInput from 'components/CInput'
import { Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { AddCategory, UpdateCategory } from '../redux/actions'

const { Option } = Select

const firstError = {
  name: '* You must enter name of category'
}

function AddCategoryModal(props) {
  const categoryList = useSelector(state => state.Dashboard.categoryList)
  const realList = props.category
    ? categoryList.filter(item => item.id !== props.category?.id)
    : categoryList
  const dispatch = useDispatch()
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(firstError.name)
      .matches(/^[a-zA-Z\s]+$/, {
        message: 'Category name cannot contain special characters'
      }),
    parentId: yup.number().nullable()
  })

  const handleAdd = values => {
    if (props.category) {
      dispatch(UpdateCategory.get({ id: props.category.id, data: values }))
    } else {
      dispatch(AddCategory.get(values))
    }
    props?.onClose()
  }

  const onCancel = () => {
    props?.onClose()
  }

  return (
    <Modal
      title={props.category ? 'Update category' : 'Add new category'}
      visible={props.visible || false}
      onCancel={onCancel}
      centered
      destroyOnClose={true}
      footer={false}
    >
      <Formik
        initialValues={{
          parentId: props.category?.parentId || null,
          name: props.category?.name || ''
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleAdd(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
          touched,
          setFieldTouched,
          setFieldValue
        }) => {
          return (
            <Form>
              <Row style={{ marginBottom: 16 }}>
                <Col span={8}>Name</Col>
                <Col span={16}>
                  <CInput
                    value={values.name}
                    onChange={handleChange('name')}
                    onTouchStart={() => setFieldTouched('name')}
                    onBlur={handleBlur('name')}
                    placeholder="Name"
                    error={errors.name}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 32 }}>
                <Col span={8}>Parent</Col>
                <Col span={16}>
                  <Select
                    style={{ width: '100%' }}
                    value={values.parentId}
                    onChange={value => setFieldValue('parentId', value)}
                  >
                    <Option value={null}>
                      Do not select to create parent category
                    </Option>
                    {realList.map(item => (
                      <Option key={`cate${item.id}`} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <Row justify="end">
                <Button
                  style={{ marginRight: 16 }}
                  size="large"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!isValid}
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                >
                  {props.category ? 'Update' : 'Add'}
                </Button>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default AddCategoryModal
