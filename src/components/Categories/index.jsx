import { Menu } from 'antd'
import { useHistory } from 'react-router-dom'

const SubMenu = Menu.SubMenu

export const Categories = listCategories => {
  const history = useHistory()
  return (
    <Menu style={{ width: 200 }} mode="vertical">
      {listCategories?.length > 0 ? (
        listCategories.map(item => {
          return (
            <SubMenu
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
                        history.push(`/categories/${item.id}`)
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
