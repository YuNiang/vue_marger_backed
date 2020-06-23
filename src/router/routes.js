// 登录
const Login = resolve => require(['../pages/Login'], resolve)

const Main = resolve => require(['../pages/Main'], resolve)

const Dashboard = resolve => require(['../pages/views/dashboard/index.vue'], resolve)

// 管理员
const Admin = resolve => require(['../pages/views/admin/index.vue'], resolve)
const AdminNew = resolve => require(['../pages/views/admin/new.vue'], resolve)
const AdminUpdatePassword = resolve => require(['../pages/views/admin/updatePassword.vue'], resolve)
const AdminApplyList = resolve => require(['../pages/views/admin/applyList.vue'], resolve)

// 接口管理
const AuthRoute = resolve => require(['../pages/views/authority/route.vue'], resolve)
const AuthRouteAddEdit = resolve => require(['../pages/views/authority/routeAddEdit.vue'], resolve)
const AuthRole = resolve => require(['../pages/views/authority/role.vue'], resolve)
const AuthRoleAddEdit = resolve => require(['../pages/views/authority/roleAddEdit.vue'], resolve)
const AuthRoleSetRoute = resolve => require(['../pages/views/authority/roleSetRoute.vue'], resolve)
const AuthUser = resolve => require(['../pages/views/authority/user.vue'], resolve)
const AuthUserAddEdit = resolve => require(['../pages/views/authority/userAddEdit.vue'], resolve)
const AuthUserSetRole = resolve => require(['../pages/views/authority/userSetRole.vue'], resolve)
const AuthApp = resolve => require(['../pages/views/authority/app.vue'], resolve)
const AuthAppAddEdit = resolve => require(['../pages/views/authority/appAddEdit.vue'], resolve)
const AuthAppSetRole = resolve => require(['../pages/views/authority/appSetRole.vue'], resolve)

const SystemSetting = resolve => require(['../pages/views/authority/setting.vue'], resolve);
const FirstManage = resolve => require(['../pages/views/first/index.vue'], resolve);
const CoachManage = resolve => require(['../pages/views/first/coach.vue'], resolve);


// 生态人员管理
const InsideStaffList = resolve => require(['../pages/views/staffMan/insideList.vue'], resolve);
const InsideStaffAdd = resolve =>  require(['../pages/views/staffMan/insideAdd.vue'], resolve);
// 俱乐部人员管理
const ClubStaffList = resolve => require(['../pages/views/staffMan/clubList.vue'], resolve);
const ClubStaffAdd = resolve => require(['../pages/views/staffMan/clubAdd.vue'], resolve);

// 俱乐部列表
const ClubList = resolve => require(['../pages/views/ecology/player/list/index.vue'], resolve);
// 我的申请
const Clubapplication = resolve => require(['../pages/views/ecology/auditFailedDrafts/index.vue'], resolve);
// 生态列表
const Ecolist = resolve => require(['../pages/views/ecology/clubList/index.vue'], resolve);

// 选手注册
const PlayerAdd = resolve => require(['../pages/views/ecology/player/add/index.vue'], resolve);
const PlayerDetail = resolve => require(['../pages/views/ecology/player/playerDetail/index.vue'], resolve);
const Actioning = resolve => require(['../pages/views/ecology/player/actioning/index.vue'], resolve);

// 选手标记问题页面
const PlayerMarkingProblem = resolve => require(['../pages/views/ecology/player/markingProblem/index.vue'], resolve);
// 选手 解约 上调 转会 下放 标记问题页面
const PlayerActionProblem = resolve => require(['../pages/views/ecology/actionProblem/index.vue'], resolve);

// 教练注册
const CoachAdd = resolve => require(['../pages/views/ecology/coach/add/index.vue'], resolve);
const CoachDetail = resolve => require(['../pages/views/ecology/coach/coachDetail/index.vue'], resolve);
// 教练标记问题页面
const CoachMarkingProblem = resolve => require(['../pages/views/ecology/coach/markingProblem/index.vue'], resolve);

// 选手 和教练 信息审核
const PlayerInformationAudit = resolve => require(['../pages/views/ecology/playerInformationAudit/index.vue'], resolve);
const CoachInformationAudit = resolve => require(['../pages/views/ecology/coachInformationAudit/index.vue'], resolve);

const AuditDetails = resolve => require(['../pages/views/ecology/informationAudit/details.vue'], resolve);
const TempManage = resolve => require(['../pages/views/ecology/templateManage/index.vue'], resolve);
const TempManageAdd = resolve => require(['../pages/views/ecology/templateManage/tempAdd.vue'], resolve);
const AuditedDetail = resolve => require(['../pages/views/ecology/informationAudit/details.vue'], resolve);

// 转会/赛事/常规赛/时间配置
const MatchTimeList = resolve => require(['../pages/views/ecology/matchTimeConfig/index.vue'], resolve);
const MatchLiveManage = resolve => require(['../pages/views/matchLive/index.vue'], resolve);
const MatchWonderfulManage = resolve => require(['../pages/views/matchWonderful/index.vue'], resolve);

export default [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'main',
    path: '/main',
    component: Main,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      } else {
        next({
          name: 'login'
        })
      }
    },
    redirect: { name: 'dashboard' },
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard
      },
      {
        name: 'admin',
        path: '/administrator',
        component: Admin
      },
      {
        name: 'adminnew',
        path: '/administrator/new',
        component: AdminNew
      },
      {
        name: 'adminupdatepassword',
        path: '/administrator/updatePassword',
        component: AdminUpdatePassword
      },
      {
        name: 'adminapply',
        path: '/administrator/apply',
        component: AdminApplyList
      },
      {
        name: 'insideStaff',
        path: '/staffing/ecoList',
        component: InsideStaffList
      },
      {
        name: 'insideStaffAdd',
        path: '/insideStaff/add',
        component: InsideStaffAdd
      },
      {
        name: 'clubStaff',
        path: '/staffing/clubList',
        component: ClubStaffList
      },
      {
        name: 'clubStaffAdd',
        path: '/clubStaff/add',
        component: ClubStaffAdd
      },
      {
        name: 'first',
        path: '/first',
        component: FirstManage
      },
      {
        name:'coach',
        path:'/coach',
        component:CoachManage
      },
      {
        name: 'authroute',
        path: '/auth/route',
        component: AuthRoute
      },
      {
        name: 'authrouteaddedit',
        path: '/auth/route/addEdit',
        component: AuthRouteAddEdit
      },
      {
        name: 'authrole',
        path: '/auth/role',
        component: AuthRole
      },
      {
        name: 'authroleaddedit',
        path: '/auth/role/addEdit',
        component: AuthRoleAddEdit
      },
      {
        name: 'authrolesetroute',
        path: '/auth/role/setRoute',
        component: AuthRoleSetRoute
      },
      {
        name: 'authuser',
        path: '/auth/user',
        component: AuthUser
      },
      {
        name: 'authuseraddedit',
        path: '/auth/user/addEdit',
        component: AuthUserAddEdit
      },
      {
        name: 'authusersetrole',
        path: '/auth/user/setRole',
        component: AuthUserSetRole
      },
      {
        name: 'authapp',
        path: '/auth/app',
        component: AuthApp
      },
      {
        name: 'authappaddedit',
        path: '/auth/app/addEdit',
        component: AuthAppAddEdit
      },
      {
        name: 'authappsetrole',
        path: '/auth/app/setRole',
        component: AuthAppSetRole
      },
      {
        name: 'authsystemsetting',
        path: '/auth/system/setting',
        component: SystemSetting
      },
      {
        name: 'ClubList',
        path: '/club/list',
        component: ClubList
      },
      {
        name: 'playerAdd',
        path: '/player/add',
        component: PlayerAdd
      },
      {
        name: 'playerDetail',
        path: '/player/playerDetail',
        component: PlayerDetail
      },
      {
        name: 'actioning',
        path: '/player/actioning',
        component: Actioning,
      },
      {
        name: 'coachAdd',
        path: '/coach/add',
        component: CoachAdd
      },
      {
        name: 'coachDetail',
        path: '/coach/coachdetail',
        component: CoachDetail
      },
      {
        name: 'Clubapplication',
        path: '/club/application',
        component: Clubapplication
      },
      {
        name: 'playerMarkingProblem',
        path: '/player/markingProblem',
        component: PlayerMarkingProblem
      },
      {
        name: 'playerActionProblem',
        path: '/actionProblem',
        component: PlayerActionProblem
      },
      {
        name: 'coachMarkingProblem',
        path: '/coach/markingProblem',
        component: CoachMarkingProblem
      },
      {
        name: 'PlayerInformationAudit',
        path: '/eco/playerAuditInformation',
        component: PlayerInformationAudit
      },
      {
        name: 'CoachInformationAudit',
        path: '/eco/coachInformationAudit',
        component: CoachInformationAudit
      },
      {
        name: 'auditedDetail',
        path: '/auditing/information/detail',
        component: AuditedDetail
      },
      {
        name: 'auditDetails',
        path: '/audited/details',
        component: AuditDetails
      },
      {
        name: 'tempManage',
        path: '/eco/templateConfig',
        component: TempManage
      },
      {
        name: 'tempManageAdd',
        path: '/auditing/tempAdd',
        component: TempManageAdd
      },
      {
        name: 'Ecolist',
        path: '/eco/list',
        component: Ecolist
      },
      {
        name: 'matchTimeList',
        path: '/eco/matchTimeConfig',
        component: MatchTimeList,
      },
      {
        name:'MatchLiveManage',
        path:'/match_valid',
        component: MatchLiveManage
      },
      {
        name: 'MatchWonderfulManage',
        path:'/wonderful_match',
        component: MatchWonderfulManage
      }
    ]
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
]
