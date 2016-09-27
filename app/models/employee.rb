class Employee < ActiveRecord::Base
  has_many :subordinates, class_name: "Employee",
                          foreign_key: "manager_id"

  belongs_to :manager, class_name: "Employee"


  validates :name, presence: true, uniqueness: true
  validates :department, presence: true

  validates_inclusion_of :department, :in => AppConstants::DEPARTMENTS, :message => "department %s is not included in the list"

  def self.managers
    Employee.all.reject{|p| p.manager}
  end

  def self.search(search)
    if search
      manager_ids = managers.map(&:id)
      managers.where('name LIKE ? or department LIKE ? and id in ?', "%#{search}%", "%#{search}%", manager_ids)
    else
      managers
    end
  end

  def self.to_csv
    attributes = %w{name department subordinates_count}

    CSV.generate(headers: true) do |csv|
      csv << attributes

      all.each do |employee|
        csv << [employee.name, employee.department, employee.subordinates.count]
      end
    end
  end


end

class Array
  def random_element
    self[rand(length)]
  end
end
