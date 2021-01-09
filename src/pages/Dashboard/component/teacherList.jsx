import {
  DeleteOutlined,
  LoadingOutlined,
  PlusCircleOutlined
} from '@ant-design/icons'
import { Button, Modal, Space, Spin, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import '../dashboard.css'
import { getColumnSearchProps } from './searchInput'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function TeacherList() {
  const categoryList = useSelector(state => state.Dashboard.categoryList)
  const isLoading = useSelector(state => state.Dashboard.isLoading)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()
  let realList = []
  categoryList.forEach(item => {
    realList.push({
      name: item.name,
      parent: null,
      id: item.id,
      parentId: item.parentId
    })
    item?.subCategory &&
      item?.subCategory.length > 0 &&
      item?.subCategory.forEach(subCat => {
        realList.push({
          name: subCat.name,
          parent: item.name,
          id: subCat.id,
          parentId: subCat.parentId
        })
      })
  })
  const [edit, setEdit] = useState({ isShow: false, category: null })

  useEffect(() => {
    // dispatch(GetAllCategories.get())
  }, [])

  const onAddNewCategory = () => {
    setEdit({ isShow: true, category: null })
  }

  const handleDelete = record => {
    Modal.confirm({
      title: 'Confirm',
      icon: <DeleteOutlined style={{ color: COLOR.primary1 }} />,
      content: 'Do you confirm to delete this category?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      centered: true,
      okButtonProps: { style: { backgroundColor: COLOR.primary1 } },
      onOk: () => {
        // dispatch(DeleteCategory.get(record.id))
        Modal.destroyAll()
      }
    })
  }

  const categoryColumns = [
    {
      ...getColumnSearchProps(
        'name',
        'Enter title to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      ...getColumnSearchProps(
        'parent',
        'Enter title to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parent',
      sorter: (a, b) => a.parent.localeCompare(b.parent)
    },
    {
      title: 'Action',
      key: 'action',
      render: (value, record) => {
        return (
          <Space>
            <DeleteOutlined
              style={{ fontSize: 20, color: '#FF0000' }}
              onClick={() => handleDelete(record)}
            />
          </Space>
        )
      }
    }
  ]

  if (isLoading) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    )
  }

  return (
    <>
      <div className="chooseContainer">
        <span className="titleTopic">Categories</span>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          style={{ width: 200, marginBottom: 32 }}
          onClick={() => onAddNewCategory()}
          size="large"
        >
          Add new category
        </Button>
        <Table columns={categoryColumns} dataSource={realList} />
      </div>
    </>
  )
}

export default TeacherList
