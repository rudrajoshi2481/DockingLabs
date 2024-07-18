import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as NGL from "ngl";
import { Switch } from "@/components/ui/switch";
import Toolbar from "./components/Toolbar";
function MainNglCanvas() {
  const [stage, setstage] = useState<NGL.Stage>();
  const [rock, setrock] = useState(false);

  const StageElementRef = useCallback((e: any) => {
    if (e) {
      const currentStage = new NGL.Stage(e);
      setstage(currentStage);
    }
  }, []);

  useEffect(() => {
    stage
      ?.loadFile("http://files.rcsb.org/download/7aad.pdb")
      .then((component: any) => {
        component.addRepresentation("cartoon", { color: "atomindex" });
      component.addRepresentation('ball+stick', { sele: 'ligand' })
      component.addRepresentation('spacefill', { sele: "water" });
  
      stage?.autoView(200)

        stage?.viewer.setBackground("white");
      }).then(() => {
        

      })

      


  }, [stage]);

  useEffect(() => {
    return (): void => {
      if (stage) {
        stage.dispose();
      }
    };
  }, [stage]);

  useEffect(() => {
    stage?.setRock(rock);
  }, [rock]);


  return (
    <div className="w-full h-full border-2 border-dashed  flex">
      {
         
      }
      <div ref={StageElementRef} className="h-full w-full" />
      <Toolbar />
    </div>
  );
}

export default MainNglCanvas;



      // console.log(waterAtoms,ionAtoms)
      // console.log(uniqueAtom)

      // console.log(component.structure)
      
        // console.log(component.structure,"this one")
        // console.log(component.structure.entityList,"this one")
        // stage.autoView(400);
        
        // component.eachRepresentation((i:any,e:any) => {
        //   console.log(i,"thi one",e)
        // })


// useEffect(() => {
//   stage
//     ?.loadFile("http://files.rcsb.org/download/7aad.pdb")
//     .then((component: any) => {
//       component.addRepresentation("cartoon", { color: "atomindex" });
//     component.addRepresentation('ball+stick', { sele: 'ligand' })
//     // component.addRepresentation('spacefill', { sele: "water" });

//     // console.log(component.structure)

//       console.log(component.structure.residueMap)

//     component.structure.eachAtom(function(atom:any) {
//       // console.log(atom)

//       // if (atom.isNonPolymer) {
//       //   atom.setVisibility = false
//       //   console.log(atom,"atom 01")
//       // }
//     });
// let uniqueAtom:any = [] 
// component.structure.eachAtom(function(atom:any) {
// // console.log(atom)
// // const atomType = atom.qualifiedName(); // You can adjust this as per your requirement
// // uniqueAtom.push(atomType);
// });
//       let waterAtoms:any = [];
//     let ionAtoms:any = [];
//     component.structure.eachAtom(function(atom:any) {
//       // console.log(atom)
//       // Check atom names or residue names to identify water and ions
//       if (atom.resname === 'HOH' || atom.resname === 'SOL') {
//         // Water molecules typically have resname 'HOH' or 'SOL'
//         waterAtoms.push(atom.index);
//       } else if (atom.resname === 'SO4' || atom.resname === 'SO3') {
//         // Sulfate ions typically have resname 'SO4' or 'SO3'
//         ionAtoms.push(atom.index);
//       }
//       // Add conditions for other ions if needed
//     });

//     // console.log(waterAtoms,ionAtoms)
//     // console.log(uniqueAtom)

    
    
//       // console.log(component.structure,"this one")
//       // console.log(component.structure.entityList,"this one")
//       stage.autoView(400);
      
//       // component.eachRepresentation((i:any,e:any) => {
//       //   console.log(i,"thi one",e)
//       // })
//       stage?.viewer.setBackground("white");
//     }).then(() => {
      

//     })

// }, [stage]);