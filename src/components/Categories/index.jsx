import { Menu } from 'antd'

const SubMenu = Menu.SubMenu

export const Categories = listCategories => {
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
                  <span>{item.cate}</span>
                </div>
              }
            >
              {item.subCat?.length > 0 ? (
                item.subCat.map(sub => {
                  return (
                    <Menu.Item style={{ width: 200 }}>{sub?.name}</Menu.Item>
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
