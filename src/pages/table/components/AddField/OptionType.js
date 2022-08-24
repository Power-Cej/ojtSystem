import TypeEnum from "./TypeEnum";
import TypeRelation from "./TypeRelation";

function OptionType({type, field, collections}) {
    switch (type) {
        case 'Enum':
            return <TypeEnum
                field={field}/>
        case 'Relation':
        case 'Pointer':
            return <TypeRelation
                field={field}
                collections={collections}/>
        default:
            return null;
    }
}

export default OptionType;
