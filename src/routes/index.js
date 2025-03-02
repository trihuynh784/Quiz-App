import LayoutDefault from "../layouts/layoutDefault";
import PageLogin from "../pages/login";
import PageHome from "../pages/home";
import PageTopics from "../pages/topics";
import PageAnswers from "../pages/answers";
import PageRegister from "../pages/register";
import PageQuiz from "../pages/quiz";
import PageResult from "../pages/result";
import PrivatePages from "../pages/privatePages";
import Error404 from "../pages/error404";
import PageLogout from "../pages/logout";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <PageLogin />,
      },
      {
        path: "register",
        element: <PageRegister />,
      },
      {
        element: <PrivatePages />,
        children: [
          {
            path: "home",
            element: <PageHome />,
          },
          {
            path: "topics",
            element: <PageTopics />,
          },
          {
            path: "answers",
            element: <PageAnswers />,
          },
          {
            path: "logout",
            element: <PageLogout />,
          },
          {
            path: "quiz/:id",
            element: <PageQuiz />,
          },
          {
            path: "result/:id",
            element: <PageResult />,
          },
        ],
      },
      {
        path: "*",
        element: <Error404 />
      }
    ],
  },
];
