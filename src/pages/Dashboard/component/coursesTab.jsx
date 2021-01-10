import { Table, Space, Avatar } from 'antd'
import React, { useRef, useState } from 'react'
import '../dashboard.css'
import { getColumnSearchProps } from './searchInput'
import moment from 'moment'
import { ROLES } from 'ultis/functions'

function CoursesTab({ courseList, role }) {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()

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
    role === ROLES.TEACHER
      ? {
          title: 'Total enrollment',
          dataIndex: 'totalEnroll',
          key: 'totalEnroll',
          sorter: (a, b) => Number(a.totalEnroll) > Number(b.totalEnroll)
        }
      : {
          title: 'Status',
          dataIndex: 'currentChapter',
          key: 'currentChapter',
          sorter: (a, b) => a.currentChapter > b.currentChapter,
          render: (value, record) => {
            return (
              <span style={{ color: 'green' }}>{`${
                record.currentChapter ? record.currentChapter : 0
              }/${record.numberOfChapter}`}</span>
            )
          }
        },
    role === ROLES.TEACHER
      ? {
          title: 'Rating',
          dataIndex: 'rating',
          key: 'rating',
          sorter: (a, b) => a.rating > b.rating
        }
      : {
          ...getColumnSearchProps(
            'teacher',
            'Enter teacher name to find',
            searchText,
            setSearchText,
            searchedColumn,
            setSearchColumn,
            refInput
          ),
          title: 'Teacher',
          dataIndex: 'teacher',
          key: 'teacher',
          sorter: (a, b) => a.teacher.localeCompare(b.teacher)
        },
    {
      title: role === ROLES.TEACHER ? 'Updated date' : 'Enroll date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => moment(a.updatedAt).isBefore(moment(b.updatedAt)),
      render: (value, record) => {
        return <span>{moment(value).format('DD/MM/YYYY')}</span>
      }
    }
  ]

  return <Table columns={courseColumns} dataSource={courseList} />
}

export default CoursesTab
