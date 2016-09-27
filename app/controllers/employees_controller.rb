class EmployeesController < ApplicationController

  # GET /employees
  def index
    @employees = Employee.search(params[:search]).paginate(page: params[:page], per_page: AppConstants::
              PAGINATION_PER_PAGE)

    @subordinates = @employees.first.subordinates.paginate(page: params[:subpage], per_page: AppConstants::
              PAGINATION_PER_PAGE)
    respond_to do |format|
      format.html
      format.js
    end
  end

  # GET /export
  def export
    @employees = Employee.all
    respond_to do |format|
      format.html
      format.csv { send_data @employees.to_csv, filename: "employees-#{Date.today}.csv" }
    end

  end


end
