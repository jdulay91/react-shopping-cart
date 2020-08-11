// import {createContext} from 'react'

// ///calling createContext creates a Provider and a Consumer
// //Provider and Consumer must be components
// const FamilyContext = createContext()
// const {}

// <FamilyContext.Provider>
//     <wrap jsx stuff here/>
// <FamilyContext.Provider/>

// or
// const { Provider, Consumer} = createContext();
// <Provider>
//     <jsx stuff here/>
// </Provider>

const FamilyContext = createContext();

export default function App() {
  const [families] = useState(data);
  const [activeFamily, setActiveFamily] = useState(families[0]);

  return (
    <FamilyContext.Provider value={activeFamily}>
      {activeFamily && <FamilyTree family={activeFamily} />}
    </FamilyContext.Provider>
  );
}

//FAMILY TREE/////////////////////////////////////////////////////////
////BEFOREEEEEEEEEEEEEEEEEEEE/////
export default function FamilyTree(props) {
  //consume data from the context object
  return (
    <div>
      <h1>{props.family.familyName}</h1>
      <h2>Parents</h2>

      {/**Pass data down as a prop */}
      <Parents family={props.family} />

      <Siblings siblings={props.family.siblings} />
    </div>
  );
}

////SINCE WE PASS AS CONTEXT IT WILL LOOK LIKE DIS
export default function FamilyTree() {
  //consume data from the context object
  ///RENDER PROPS PATTERN (HARD PART)
  ///whatever we pass in the parent component gets called in the function in line 59
  /// IMPORT THE CONSUMER
  import { FamilyContext } from "../contexts";
  // wrap the consumer component around our JSX that needs the data
  return (
    <div>
      <FamilyContext.Consumer>
        {family => {
          return (
            <React.Fragment>
              <h1>{family.familyName}</h1>
              <h2>Parents</h2>
              <Parents family={family} />
              <Siblings siblings={family.siblings} />
            </React.Fragment>
          );
        }}
      </FamilyContext.Consumer>
    </div>
  );
}



///CONTEXT HOOK PATTERN
  //consume data from the context object rather than from props
  /// IMPORT THE Context Object
// call context hook and pass in the context object

import { useContext } from 'react'
import { FamilyContext } from '../contexts'

const Siblings = () =>{
const family = useContext(FamilyContext)
return (
    <section>
        {family.siblings.map(s=>(
            <div>
                <img src={s.img} alt{s.name}/>
                <strong>{s.name}</strong>
            </div>
        ))}
    </section>
)
}