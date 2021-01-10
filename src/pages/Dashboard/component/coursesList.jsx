import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Modal, Space, Spin, Table } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import '../dashboard.css'
import { GetAllCourses } from '../redux/actions'
import { getColumnSearchProps } from './searchInput'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function CoursesList() {
  const courseList = useSelector(state => state.Dashboard.courseList)
  const isLoading = useSelector(state => state.Dashboard.isLoading)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()

  useEffect(() => {
    dispatch(GetAllCourses.get())
  }, [])

  const handleDelete = record => {
    Modal.confirm({
      title: 'Confirm',
      icon: <DeleteOutlined style={{ color: COLOR.primary1 }} />,
      content: 'Do you confirm to delete this course?',
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

  const courseColumns = [
    {
      ...getColumnSearchProps(
        'name',
        'Enter name to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'Course',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (value, record) => {
        return (
          <Space>
            <Avatar shape="square" size={56} src={record?.thumbnail} />
            <span>{value}</span>
          </Space>
        )
      }
    },
    {
      ...getColumnSearchProps(
        'category',
        'Enter category to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category)
    },
    {
      title: 'Total enrollment',
      dataIndex: 'enrollCount',
      key: 'enrollCount',
      sorter: (a, b) => Number(a.enrollCount) > Number(b.enrollCount)
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating > b.rating
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price > b.price
    },
    {
      ...getColumnSearchProps(
        'teacherName',
        'Enter teacher name to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'Teacher',
      dataIndex: 'teacherName',
      key: 'teacherName',
      sorter: (a, b) => a.teacherName.localeCompare(b.teacherName),
      render: (value, record) => {
        return (
          <Space>
            <Avatar size={56} src={record?.teacherAvatar} />
            <span>{value}</span>
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
        <span className="titleTopic">Courses</span>
        <Table columns={courseColumns} dataSource={courseList} />
      </div>
    </>
  )
}

export default CoursesList
