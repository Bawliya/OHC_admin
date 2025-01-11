// import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
// import {PageLink, PageTitle} from '../../../_metronic/layout/core'
// import PrivateChat from './components/Private'
// // import {Group} from './components/Group'
// // import {Drawer} from './components/Drawer'

// const chatBreadCrumbs: Array<PageLink> = [
//   {
//     title: 'Chat',
//     path: '/apps/chat/private-chat',
//     isSeparator: false,
//     isActive: false,
//   },
//   {
//     title: '',
//     path: '',
//     isSeparator: true,
//     isActive: false,
//   },
// ]

// const ChatPage = () => {
//   return (
//     <Routes>
//       <Route element={<Outlet />}>
//         <Route
//           path='private-chat'
//           element={
//             <>
//               <PageTitle breadcrumbs={chatBreadCrumbs}>Private chat</PageTitle>
//               <PrivateChat />
//             </>
//           }
//         />
//         <Route index element={<Navigate to='/apps/chat/private-chat' />} />
//       </Route>
//     </Routes>
//   )
// }

// export default ChatPage
