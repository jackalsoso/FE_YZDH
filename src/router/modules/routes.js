import Index from '@/pages/index/index'
import Detail from '@/pages/detail/index'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: 'Index',
      keepAlive: false
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      title: 'Detail',
      keepAlive: false
    }
  }
]

export default routes;
