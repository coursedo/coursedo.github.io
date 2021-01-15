import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { Avatar, Space, Table, Modal } from 'antd'
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import 'pages/Dashboard/dashboard.css'
import { getColumnSearchProps } from 'pages/Dashboard/component/searchInput'
import { COLOR } from 'ultis/functions'
import { useDispatch, useSelector } from 'react-redux'
import { AddToWatchList } from 'pages/DetailCourse/redux/actions'

function WatchlistTab({ courseList }) {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)

  const handleView = record => {
    history.push(`/course/${record.id}`)
  }

  const handleDelete = record => {
    Modal.confirm({
      title: 'Confirm',
      icon: <DeleteOutlined style={{ color: COLOR.primary1 }} />,
      content: `Do you confirm to move ${record.name} out of watchlist?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      centered: true,
      okButtonProps: { style: { backgroundColor: COLOR.primary1 } },
      onOk: () => {
        dispatch(AddToWatchList.get({ id: user.id, courseId: record.id }))
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
    },
    {
      title: 'Action',
      key: 'action',
      render: (value, record) => {
        return (
          <Space>
            <EyeOutlined
              style={{ fontSize: 20 }}
              onClick={() => handleView(record)}
            />
            <DeleteOutlined
              style={{ fontSize: 20, color: '#FF0000' }}
              onClick={() => handleDelete(record)}
            />
          </Space>
        )
      }
    }
  ]

  return <Table columns={courseColumns} dataSource={courseList} />
}

export default WatchlistTab
