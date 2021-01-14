import { Menu } from 'antd'
import { UpdateCurCate } from 'pages/Courses/redux/actions'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const SubMenu = Menu.SubMenu

export const Categories = listCategories => {
  const history = useHistory()
  const dispatch = useDispatch()
  return (
    <Menu style={{ width: 256 }} mode="vertical">
      {listCategories?.length > 0 ? (
        listCategories.map(item => {
          return (
            <SubMenu
              onTitleClick={() => {
                dispatch(UpdateCurCate.get(item?.name))
                history.push(`/categories/${item.id}`)
              }}
              title={
                <div
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{item.name}</span>
                </div>
              }
            >
              {item.subCategory?.length > 0 ? (
                item.subCategory.map(sub => {
                  return (
                    <Menu.Item
                      style={{ minWidth: 200 }}
                      onClick={() => {
                        dispatch(UpdateCurCate.get(sub?.name))
                        history.push(`/categories/${sub.id}`)
                      }}
                    >
                      {sub?.name}
                    </Menu.Item>
                  )
                })
              ) : (
                <div />
              )}
            </SubMenu>
          )
        })
      ) : (
        <div />
      )}
    </Menu>
  )
}
