export default {
    common: {
      status: {
        enable: 'Enable',
        disable: 'Disable',
      },
    },
    role: {
      title: 'Role List',
      roleName: 'Role Name',
      roleCode: 'Role Code',
      roleStatus: 'Role Status',
      roleDesc: 'Role Description',
      menuAuth: 'Menu Auth',
      buttonAuth: 'Button Auth',
      apiAuth: 'API Auth',
      form: {
        roleName: 'Please enter role name',
        roleCode: 'Please enter role code',
        roleStatus: 'Please select role status',
        roleDesc: 'Please enter role description',
      },
      addRole: 'Add Role',
      editRole: 'Edit Role',
    },
    log: {
      title: 'Log List',
      logType: 'Log type',
      logUser: 'Log user',
      logDetailType: 'Log deatil',
      requestUrl: 'Request url',
      createTime: 'Create time',
      responseCode: 'Response code',
      form: {
        logType: 'Please select Log type',
        logUser: 'Please enter Log user',
        logDetailType: 'Please select Log deatil',
        requestUrl: 'Please enter Request url',
        createTime: 'Please select Create time',
        responseCode: 'Please enter Response code',
      },
      viewLog: 'View Log',
      logDetailTypes: {
        SystemStart: 'System start',
        SystemStop: 'System stop',
        UserLoginSuccess: 'User login success',
        UserAuthRefreshTokenSuccess: 'User authentication refresh token success',
        UserLoginGetUserInfo: 'User login get user info',
        UserLoginUserNameVaild: 'User login username valid',
        UserLoginErrorPassword: 'User login error password',
        UserLoginForbid: 'User login forbidden',
        ApiGetList: 'API get list',
        ApiGetTree: 'API get tree',
        ApiRefresh: 'API refresh',
        ApiGetOne: 'API get one',
        ApiCreateOne: 'API create one',
        ApiUpdateOne: 'API update one',
        ApiDeleteOne: 'API delete one',
        ApiBatchDelete: 'API batch delete',
        MenuGetList: 'Menu get list',
        MenuGetTree: 'Menu get tree',
        MenuGetPages: 'Menu get pages',
        MenuGetButtonsTree: 'Menu get buttons tree',
        MenuGetOne: 'Menu get one',
        MenuCreateOne: 'Menu create one',
        MenuUpdateOne: 'Menu update one',
        MenuDeleteOne: 'Menu delete one',
        MenuBatchDeleteOne: 'Menu batch delete',
        RoleGetList: 'Role get list',
        RoleGetMenus: 'Role get menus',
        RoleUpdateMenus: 'Role update menus',
        RoleGetButtons: 'Role get buttons',
        RoleUpdateButtons: 'Role update buttons',
        RoleGetApis: 'Role get APIs',
        RoleUpdateApis: 'Role update APIs',
        RoleGetOne: 'Role get one',
        RoleCreateOne: 'Role create one',
        RoleUpdateOne: 'Role update one',
        RoleDeleteOne: 'Role delete one',
        RoleBatchDeleteOne: 'Role batch delete',
        UserGetList: 'User get list',
        UserGetOne: 'User get one',
        UserCreateOne: 'User create one',
        UserUpdateOne: 'User update one',
        UserDeleteOne: 'User delete one',
        UserBatchDeleteOne: 'User batch delete',
      },
      logTypes: {
        ApiLog: 'Api log',
        UserLog: 'User log',
        AdminLog: 'Admin log',
        SystemLog: 'System log',
      },
    },

    api: {
      title: 'API List',
      path: 'Path',
      method: 'Method',
      summary: 'Summary',
      tags: 'Tags',
      status: 'Status',
      form: {
        path: 'Please enter path',
        method: 'Please select method',
        summary: 'Please enter summary',
        tags: 'Please enter tags',
        status: 'Please select user status',
      },
      addApi: 'Add API',
      editApi: 'Edit API',
      methods: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
      },
    },
    user: {
      title: 'User List',
      userName: 'User Name',
      password: 'Password',
      userGender: 'Gender',
      nickName: 'Nick Name',
      userPhone: 'Phone Number',
      userEmail: 'Email',
      userStatus: 'User Status',
      userRole: 'User Role',
      form: {
        userName: 'Please enter user name',
        password: 'Please enter password',
        userGender: 'Please select gender',
        nickName: 'Please enter nick name',
        userPhone: 'Please enter phone number',
        userEmail: 'Please enter email',
        userStatus: 'Please select user status',
        userRole: 'Please select user role',
      },
      addUser: 'Add User',
      editUser: 'Edit User',
      gender: {
        male: 'Male',
        female: 'Female',
        unknow: 'Unknow',
      },
    },
    menu: {
      home: 'Home',
      title: 'Menu List',
      id: 'ID',
      parentId: 'Parent ID',
      menuType: 'Menu Type',
      menuName: 'Menu Name',
      routeName: 'Route Name',
      routePath: 'Route Path',
      pathParam: 'Path Param',
      layout: 'Layout Component',
      page: 'Page Component',
      i18nKey: 'I18n Key',
      icon: 'Icon',
      localIcon: 'Local Icon',
      iconTypeTitle: 'Icon Type',
      order: 'Order',
      constant: 'Constant',
      keepAlive: 'Keep Alive',
      href: 'Href',
      hideInMenu: 'Hide In Menu',
      activeMenu: 'Active Menu',
      multiTab: 'Multi Tab',
      fixedIndexInTab: 'Fixed Index In Tab',
      query: 'Query Params',
      button: 'Button',
      buttonCode: 'Button Code',
      buttonDesc: 'Button Desc',
      menuStatus: 'Menu Status',
      form: {
        home: 'Please select home',
        menuType: 'Please select menu type',
        menuName: 'Please enter menu name',
        routeName: 'Please enter route name',
        routePath: 'Please enter route path',
        pathParam: 'Please enter path param',
        page: 'Please select page component',
        layout: 'Please select layout component',
        i18nKey: 'Please enter i18n key',
        icon: 'Please enter iconify name',
        localIcon: 'Please enter local icon name',
        order: 'Please enter order',
        keepAlive: 'Please select whether to cache route',
        href: 'Please enter href',
        hideInMenu: 'Please select whether to hide menu',
        activeMenu: 'Please select route name of the highlighted menu',
        multiTab: 'Please select whether to support multiple tabs',
        fixedInTab: 'Please select whether to fix in the tab',
        fixedIndexInTab: 'Please enter the index fixed in the tab',
        queryKey: 'Please enter route parameter Key',
        queryValue: 'Please enter route parameter Value',
        button: 'Please select whether it is a button',
        buttonCode: 'Please enter button code',
        buttonDesc: 'Please enter button description',
        menuStatus: 'Please select menu status',
      },
      addMenu: 'Add Menu',
      editMenu: 'Edit Menu',
      addChildMenu: 'Add Child Menu',
      type: {
        directory: 'Directory',
        menu: 'Menu',
      },
      iconType: {
        iconify: 'Iconify Icon',
        local: 'Local Icon',
      },
    },
  }