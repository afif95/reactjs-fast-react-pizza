import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order, { loader as orderLoader } from './features/order/Order';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import { action as updateOrderAction } from './features/order/UpdateOrder';
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        // this is render as you fetch strategy: ReactRouter will start fetching the data at the same time as it starts rendering the correct route
        // fetch on render strategy creates waterfalls
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        // during form submission on this route, this action will be called with the formData
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        action: updateOrderAction,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
