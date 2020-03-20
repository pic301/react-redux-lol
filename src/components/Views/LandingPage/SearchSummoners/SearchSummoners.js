import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { FormControl,InputGroup,Button} from 'react-bootstrap'
import { FaSearch } from "react-icons/fa";
import { summonersName } from "../../../../actions/summoners_action";
import { withRouter } from 'react-router-dom'

const SearchSummoners = ({history}) => {
  const dispatch = useDispatch()
  const summonerName = useSelector(state => state.summoners.summonerName)
  const onChangeHandler = (e) =>{
    dispatch(summonersName(e.target.value))
  }
  const onClickSearch = () =>{
    history.push(`/summoner/${summonerName}`)
  }
    return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="소환사 명을 입력해주세요."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={onChangeHandler}
          value={summonerName}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={onClickSearch}>
            <FaSearch />
        
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default withRouter(SearchSummoners);
