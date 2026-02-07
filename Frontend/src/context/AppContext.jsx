import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

export function AppProvider({ children }) {
const [postData, setPostData] = useState({
    id: null,
    banner: '',
    heading: '',
    excerpt: '',
    date: '',
    category: '',
    content: [],
});

const [blogsData, setBlogsData] = useState(null);

return (
<AppContext.Provider value={{ postData, setPostData, blogsData, setBlogsData }}>
{children}
</AppContext.Provider>
);
}

AppProvider.propTypes = {
children: PropTypes.node.isRequired,
};