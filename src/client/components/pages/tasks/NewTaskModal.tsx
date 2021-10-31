import Button from "../../global/Button";
import TextInput from "../../global/TextInput";
import Modal from "../../global/Modal";
import { useState } from "react";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import {createdTasks} from "./createdTasks";
import {db} from "../../db/db";
import {newTask} from "../../db/interfaces";
import * as _ from "lodash";
import { useLiveQuery } from "dexie-react-hooks";



type NewTaskModalProps = {
  toggleModal: React.MouseEventHandler<HTMLDivElement> | undefined;
};

const policyIds = {
  derpbirds: 'b92f6473f18d4b78733d022fd89f3cacc1484fab6eddfd3c5d4b9494',
  babyalienclub: '15509d4cb60f066ca4c7e982d764d6ceb4324cb33776d1711da1beee',
  yummiuniverse: 'b1814c6d3b0f7a42c9ee990c06c9d504a42bb22bf0e34e7908ae21b2',
  tigerSociety: '545dc1601b5d469508698f7966a3c1c8cf207073041ad84b28d373c1',
  clayNation: '40fa2aa67258b4ce7b5782f74831d46a84c59a0ff0c28262fab21728',
  lionlegends: '7eb7cf060a9740b63de68afb1c0fde7f74f2895c981573259046ae3f',
  spoopynaru: '7d2d1ee92be476d47043d26ac5a45402e3bdb50a34aa8d716babeefc',
  zombiechains: '96580bbc4fe27ac0d127db3f8a0dc698c58d303d8cae870f5771f336',
  cardanotrees: 'e09e4f4217669b7f735b7a3724e835d8d6344db128eb03d6ea72885e'
}

export function NewTaskModal({ toggleModal }: NewTaskModalProps) {
  const [site, setSite] = useState("");
  // const [proxy, setProxy] = useState("");
  const [profile, setProfile] = useState("");
  const [mode, setMode] = useState("");
  const [monitorDelay, setMonitorDelay] = useState(3000);
  const [monitorMode, setMonitorMode] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [verified, setVerified] = useState("verified");
  const [qty, setQty] = useState(0);
  const [project, setProject] = useState("");
  const [priceLimit, setPriceLimit] = useState(0);
  const [feature0, setFeature0] = useState('x');
  const [feature1, setFeature1] = useState('x');
  const [feature2, setFeature2] = useState('x');
  const [feature3, setFeature3] = useState('x');
  const [feature4, setFeature4] = useState('x');
  const [feature5, setFeature5] = useState('x');
  const [feature6, setFeature6] = useState('x');
  const [feature7, setFeature7] = useState('x');
  const [feature8, setFeature8] = useState('x');
  const [feature9, setFeature9] = useState('x');
  const [feature10, setFeature10] = useState('x');
  const [feature11, setFeature11] = useState('x');

  async function createNewTask(e: any) {
    let lastTask = await db.tasks.orderBy('id').last();
    let id: number = lastTask?.id || 0;
    let projectParameters = getProjectParameters();
    let projectId = policyId;
    // eslint-disable-next-line eqeqeq
    if (project != 'custom') {
      const id = _.get(policyIds, project);
      projectId = id;
    }
    if (qty) {
      let i = 0;
      let bulkTasks = [];
      for (i = 0; i < Number(qty); i++) {
        let newTask: newTask = {
          id: id + 1 + bulkTasks.length,
          profile: profile,
          site: site,
          mode: mode,
          status: "Idle",
          monitorDelay: monitorDelay,
          monitorMode: monitorMode,
          priceLimit: priceLimit,
          project: project,
          policyId: projectId,
          parameters: projectParameters
        };
        bulkTasks.push(newTask);
      }
      console.log(bulkTasks);
      await db.tasks.bulkAdd(bulkTasks);
    } else {
      let newTask: newTask = {
        id: id + 1,
        profile: profile,
        site: site,
        mode: mode,
        status: "Idle",
        monitorDelay: monitorDelay,
        monitorMode: monitorMode,
        priceLimit: priceLimit,
        project: project,
        policyId: projectId,
        parameters: projectParameters
      };
      createdTasks.push(newTask);
      console.log(createdTasks);
      db.tasks.add(newTask, newTask.id);
    }
  }

  function getProjectParameters(): newTask['parameters'] {
    let parameters: newTask['parameters'];
    switch (project) {
      case 'yummiuniverse':
        parameters = {
          headwear: feature0,
          background: feature1,
          face: feature2,
          body: feature3,
        }
        break;
      case 'babyaleinclub':
        parameters = {
          hat: feature0,
          face: feature1,
          accessory: feature2,
          mouth: feature3,
          background: feature4,
          body: feature5,
          eyes: feature6,
          clothes: feature7,
          traitCount: feature8
        }
        break;
      case 'derpbirds':
        parameters = {
          rarity: feature0,
          back: feature1,
          body: feature2,
          ears: feature3,
          eyes: feature4,
          head: feature5,
          tail: feature6,
          color: feature7,
          beakface: feature8,
          basecolor: feature9,
          perfect: feature10,
        }
        break;
      case 'clayNation':
        parameters = {
          body: feature0,
          eyes: feature1,
          brows: feature2,
          mouth: feature3,
          clothes: feature4,
          background: feature5,
          wings: feature6,
          accessories: feature7,
          hatsandhair: feature8,
        }
        break;
      case 'tigerSociety':
        parameters = {
          background: feature0,
          body: feature1,
          texture: feature2,
          expression: feature3,
          eyeWear: feature4,
          hat: feature5,
          props: feature6,
          hair: feature7,
          rareElement: feature8,
          jacket: feature9,
          scarf: feature10,
          traitCount: feature11,
        }
        break;
      case 'lionlegends':
        parameters = {
          background: feature0,
          fur: feature1,
          clothes: feature2,
          mouth: feature3,
          eyeWear: feature4,
          hat: feature5
        }
        break;
      case 'spoopynaru':
        parameters = {
          background: feature0,
          face: feature1,
          headwear: feature2,
          body: feature3,
        }
        break;
      case 'zomebiechains':
        parameters = {
          hat: feature0,
          eyes: feature1,
          nose: feature2,
          skin: feature3,
          mouth: feature4,
          chains: feature5,
          weapon: feature6,
          clothing: feature7,
          earrings: feature8,
          background: feature9,
          traitcount: feature10
        }
        break;
      case 'cardanotrees':
        parameters = {
          fruits: feature0,
          flowers: feature1,
          abundance: feature2,
          species: feature3,
          numTrees: feature4,
          enviroment: feature5,
          country: feature6
        }
        break;
    }
    return parameters;
  }

  // const proxies = useLiveQuery(
  //     () => db.proxies
  //         .toArray()
  // );

  const profiles = useLiveQuery(
      () => db.profiles
          .toArray()
  );

  return (
    <Modal
      title="New Task"
      toggleModal={toggleModal}
      footer={
        <Button
          bright
          icon={faRocket}
          style={{ gridColumn: "span 2" }}
          text="Create"
          onClick={(e) => createNewTask(e)}
        />
      }
    >
      <TextInput
        type="select"
        label="Site"
        onChange={(e) => setSite(e.target.value)}
        value={site}
      >
        <option value=""></option>
        <option value="cnft.io">Cnft.io</option>
      </TextInput>
      <TextInput
          type="select"
          label="Profile"
          onChange={(e) => {
            setProfile(e.target.value);
          }}
          value={profile}
      >
        <option value=""> </option>
        {profiles?.map((profile) => (
            <option key={profile.profileName} value={profile.profileName} label={profile.profileName}/>
        ))}
      </TextInput>
          <>
            <TextInput
                type="select"
                label="Mode"
                onChange={(e) => setMode(e.target.value)}
                value={mode}
            >
              <option value=""></option>
              {site === "cnft.io" && (
                  <>
                    <option value="regular">Regular</option>
                    <option value="sweep">Sweep</option>
                  </>
              )}
            </TextInput>
          </>

      <>

        <TextInput
            type="select"
            label="Project"
            onChange={(e) => setProject(e.target.value)}
            value={project}
        >
          <>
            <option value=""></option>
            <option value="custom">Custom</option>
            <option value="derpbirds">Derp Birds</option>
            <option value="babyalienclub">Baby Alien Club</option>
            <option value="yummiuniverse">Yummi Universe</option>
            <option value="clayNation">Clay Nation</option>
            <option value="tigerSociety">Tiger Society</option>
            <option value="cardanotrees">Cardano Trees</option>
            <option value="spoopynaru">Spoopy Naru</option>
            <option value="lionlegends">Lion Legends</option>
            <option value="zomebiechains">Zombie Chains</option>
          </>
        </TextInput>

        {project === "custom" && (
            <TextInput type="text"
                       label="Policy Id"
                       value={policyId}
                       onChange={(e) => setPolicyId(e.target.value)} />


        )}

        {project === "custom" && (
            <TextInput
                type="select"
                label="Verified Projects?"
                onChange={(e) => setVerified(e.target.value)}
                value={verified}
            >
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified As Well</option>
            </TextInput>


        )}
      </>

      {/*<TextInput*/}
      {/*  type="select"*/}
      {/*  label="Proxy List"*/}
      {/*  onChange={(e) => {*/}
      {/*    setProxy(e.target.value);*/}
      {/*  }}*/}
      {/*  value={proxy}*/}
      {/*>*/}
      {/*  <option value="N/A">N/A</option>*/}
      {/*  {proxies?.map((proxy) => (*/}
      {/*    <option key={proxy.name} value={proxy.name} label={proxy.name}/>*/}
      {/*  ))}*/}
      {/*</TextInput>*/}
      <TextInput type="number" label="Monitor Delay" onChange={(e) => setMonitorDelay(Number(e.target.value))} />

      <TextInput
          type="select"
          label="Monitor Mode"
          onChange={(e) => setMonitorMode(e.target.value)}
          value={monitorMode}
      >
        <>
          <option value=""></option>
          <option value="floorSnipe">Floor</option>
          {
            project !== 'custom' && (
                <option value="filterFeatures">Filter by Feature</option>
            )
          }
        </>
      </TextInput>
      {project === "derpbirds" && monitorMode === "filterFeatures" && (
        <>
          <TextInput type="text" label="Rarity" value={feature0} onChange={(e) => setFeature0(e.target.value)} />
          <TextInput type="text" label="Back" value={feature1} onChange={(e) => setFeature1(e.target.value)} />
          <TextInput type="text" label="Body" value={feature2} onChange={(e) => setFeature2(e.target.value)} />
          <TextInput type="text" label="Ears" value={feature3} onChange={(e) => setFeature3(e.target.value)} />
          <TextInput type="text" label="Eyes" value={feature4} onChange={(e) => setFeature4(e.target.value)} />
          <TextInput type="text" label="Head" value={feature5} onChange={(e) => setFeature5(e.target.value)} />
          <TextInput type="text" label="Tail" value={feature6} onChange={(e) => setFeature6(e.target.value)} />
          <TextInput type="text" label="Color" value={feature7} onChange={(e) => setFeature7(e.target.value)} />
          <TextInput type="text" label="Beakface" value={feature8} onChange={(e) => setFeature8(e.target.value)} />
          <TextInput type="text" label="Basecolor" value={feature9} onChange={(e) => setFeature9(e.target.value)} />
          <TextInput type="text" label="Perfect" value={feature10} onChange={(e) => setFeature10(e.target.value)} />
        </>
      )}

      {project === "babyalienclub" && monitorMode === "filterFeatures" &&  (
          <>
            <TextInput type="text" label="Hat" value={feature0} onChange={(e) => setFeature0(e.target.value)} />
            <TextInput type="text" label="Face"  value={feature1}onChange={(e) => setFeature1(e.target.value)} />
            <TextInput type="text" label="Accessory" value={feature2} onChange={(e) => setFeature2(e.target.value)} />
            <TextInput type="text" label="Mouth" value={feature3} onChange={(e) => setFeature3(e.target.value)} />
            <TextInput type="text" label="Background" value={feature4} onChange={(e) => setFeature4(e.target.value)} />
            <TextInput type="text" label="Body" value={feature5} onChange={(e) => setFeature5(e.target.value)} />
            <TextInput type="text" label="Eyes" value={feature6} onChange={(e) => setFeature6(e.target.value)} />
            <TextInput type="text" label="Clothes" value={feature7} onChange={(e) => setFeature7(e.target.value)} />
            <TextInput type="text" label="Trait Count" value={feature8} onChange={(e) => setFeature8(e.target.value)} />
          </>
      )}

      {project === "yummiuniverse" && monitorMode === "filterFeatures" && (
          <>
            <TextInput type="text" label="Background" value={feature0} onChange={(e) => setFeature0(e.target.value)} />
            <TextInput type="text" label="Face" value={feature1} onChange={(e) => setFeature1(e.target.value)} />
            <TextInput type="text" label="Body" value={feature2} onChange={(e) => setFeature2(e.target.value)} />
            <TextInput type="text" label="Headwear" value={feature3} onChange={(e) => setFeature3(e.target.value)} />
          </>
      )}

      {project === "clayNation" && monitorMode === "filterFeatures" && (
          <>
            <TextInput type="text" label="Body" value={feature0} onChange={(e) => setFeature0(e.target.value)} />
            <TextInput type="text" label="Eyes"  value={feature1}onChange={(e) => setFeature1(e.target.value)} />
            <TextInput type="text" label="Brows" value={feature2} onChange={(e) => setFeature2(e.target.value)} />
            <TextInput type="text" label="Mouth" value={feature3} onChange={(e) => setFeature3(e.target.value)} />
            <TextInput type="text" label="Clothes" value={feature4} onChange={(e) => setFeature4(e.target.value)} />
            <TextInput type="text" label="Background" value={feature5} onChange={(e) => setFeature5(e.target.value)} />
            <TextInput type="text" label="Wings" value={feature6} onChange={(e) => setFeature6(e.target.value)} />
            <TextInput type="text" label="Accessories" value={feature7} onChange={(e) => setFeature7(e.target.value)} />
            <TextInput type="text" label="Hats and Hair" value={feature8} onChange={(e) => setFeature8(e.target.value)} />
          </>
      )}

      {project === "tigerSociety" && monitorMode === "filterFeatures" && (
          <>
            <TextInput type="text" label="Background" value={feature0} onChange={(e) => setFeature0(e.target.value)} />
            <TextInput type="text" label="Body"  value={feature1}onChange={(e) => setFeature1(e.target.value)} />
            <TextInput type="text" label="Texture" value={feature2} onChange={(e) => setFeature2(e.target.value)} />
            <TextInput type="text" label="Expression" value={feature3} onChange={(e) => setFeature3(e.target.value)} />
            <TextInput type="text" label="Eye Wear" value={feature4} onChange={(e) => setFeature4(e.target.value)} />
            <TextInput type="text" label="Hat" value={feature5} onChange={(e) => setFeature5(e.target.value)} />
            <TextInput type="text" label="Props" value={feature6} onChange={(e) => setFeature6(e.target.value)} />
            <TextInput type="text" label="Hair" value={feature7} onChange={(e) => setFeature7(e.target.value)} />
            <TextInput type="text" label="Rare Element" value={feature8} onChange={(e) => setFeature8(e.target.value)} />
            <TextInput type="text" label="Jacket" value={feature9} onChange={(e) => setFeature9(e.target.value)} />
            <TextInput type="text" label="Scarf" value={feature10} onChange={(e) => setFeature10(e.target.value)} />
            <TextInput type="text" label="Trait Count" value={feature11} onChange={(e) => setFeature11(e.target.value)} />
          </>
      )}

      {project === "lionlegends" && monitorMode === "filterFeatures" && (
          <>
            <TextInput type="text" label="Background" value={feature0} onChange={(e) => setFeature0(e.target.value)} />
            <TextInput type="text" label="Fur"  value={feature1}onChange={(e) => setFeature1(e.target.value)} />
            <TextInput type="text" label="Clothes" value={feature2} onChange={(e) => setFeature2(e.target.value)} />
            <TextInput type="text" label="Mouth" value={feature3} onChange={(e) => setFeature3(e.target.value)} />
            <TextInput type="text" label="Eye Wear" value={feature4} onChange={(e) => setFeature4(e.target.value)} />
            <TextInput type="text" label="Hat" value={feature5} onChange={(e) => setFeature5(e.target.value)} />
          </>
      )}

      {project === "spoopynaru" && monitorMode === "filterFeatures" && (
          <>
            <TextInput type="text" label="Background" value={feature0} onChange={(e) => setFeature0(e.target.value)} />
            <TextInput type="text" label="Face"  value={feature1}onChange={(e) => setFeature1(e.target.value)} />
            <TextInput type="text" label="Headwear" value={feature2} onChange={(e) => setFeature2(e.target.value)} />
            <TextInput type="text" label="Body" value={feature3} onChange={(e) => setFeature3(e.target.value)} />
          </>
      )}

      {project === "zomebiechains" && monitorMode === "filterFeatures" && (
          <>
            <TextInput type="text" label="Hat" value={feature0} onChange={(e) => setFeature0(e.target.value)} />
            <TextInput type="text" label="Eyes"  value={feature1}onChange={(e) => setFeature1(e.target.value)} />
            <TextInput type="text" label="Nose" value={feature2} onChange={(e) => setFeature2(e.target.value)} />
            <TextInput type="text" label="Skin" value={feature3} onChange={(e) => setFeature3(e.target.value)} />
            <TextInput type="text" label="Mouth" value={feature4} onChange={(e) => setFeature4(e.target.value)} />
            <TextInput type="text" label="Chains" value={feature5} onChange={(e) => setFeature5(e.target.value)} />
            <TextInput type="text" label="Weapon" value={feature6} onChange={(e) => setFeature6(e.target.value)} />
            <TextInput type="text" label="Clothing" value={feature7} onChange={(e) => setFeature7(e.target.value)} />
            <TextInput type="text" label="Earings" value={feature8} onChange={(e) => setFeature8(e.target.value)} />
            <TextInput type="text" label="Background" value={feature9} onChange={(e) => setFeature9(e.target.value)} />
            <TextInput type="text" label="Trait Count" value={feature11} onChange={(e) => setFeature10(e.target.value)} />
          </>
      )}

      {project === "cardanotrees" && monitorMode === "filterFeatures" && (
          <>
            <TextInput type="text" label="Fruits" value={feature0} onChange={(e) => setFeature0(e.target.value)} />
            <TextInput type="text" label="Flowers"  value={feature1}onChange={(e) => setFeature1(e.target.value)} />
            <TextInput type="text" label="Abundance" value={feature2} onChange={(e) => setFeature2(e.target.value)} />
            <TextInput type="text" label="Species" value={feature3} onChange={(e) => setFeature3(e.target.value)} />
            <TextInput type="text" label="Number of Trees" value={feature4} onChange={(e) => setFeature4(e.target.value)} />
            <TextInput type="text" label="Enviroment" value={feature5} onChange={(e) => setFeature5(e.target.value)} />
            <TextInput type="text" label="Country" value={feature6} onChange={(e) => setFeature6(e.target.value)} />
          </>
      )}

      <TextInput label="Price Limit" onChange={(e) => setPriceLimit(Number(e.target.value))} />
      <TextInput label="QTY" type="number" onChange={(e) => setQty(Number(e.target.value))} />

    </Modal>
  );
};
export default NewTaskModal;
