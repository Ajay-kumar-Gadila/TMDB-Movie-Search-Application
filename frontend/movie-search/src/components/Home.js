import Nav from "./Nav";
import SearchPanel from "./SearchPanel";
import { useNavigate } from "react-router-dom";

import ToggleButton from "./ToggleButton";
import Footer from "./Footer";

export default function Home() {
  const navigate = useNavigate();
  function navigateToSearchPage(event) {
    const searchString = event.target.elements.search.value;
    console.log(searchString);
    navigate(`/search/${searchString}`);
  }
  return (
    <>
      <Nav></Nav>
      <SearchPanel navToSearch={navigateToSearchPage}></SearchPanel>
      <ToggleButton />
      <Footer />
    </>
  );
}
