# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


3000.times do |m|
  puts "Creating manager_#{m} and its subordinates"
  manager = Employee.create(name: "m_#{m}", department: AppConstants::DEPARTMENTS.random_element)
  1000.times do |e|
    employee = Employee.create(name: "s_#{m}_#{e}", department: manager.department, :manager_id =>
              manager.id)
  end
end
