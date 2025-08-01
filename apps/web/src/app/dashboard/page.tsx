import { Attribute } from '../../modules/attribute/attribute'
import { AttributeList } from '../../modules/attribute/attributes-list'

export default function PageDashboard() {
  return (
    <div>
      PAGE DASHBOARD
      <AttributeList />
      <div className="p-4">
        <Attribute />
      </div>
    </div>
  )
}
