class ExercisesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_exercise, except: [:index, :new, :create]

  def index
    @exercises = current_user.exercises
  end

  def show
  end

  def new
    @exercise = current_user.exercises.new
  end

  def create
    @exercise = current_user.exercises.new(exercise_params)

    if @exercise.save
      flash[:notice] = 'Exercise has been created'

      redirect_to [current_user, @exercise]
    else

      flash[:alert] = 'Exercise has not been created'
      render :new
    end
  end

  def edit
  end

  def update
    if @exercise.update(exercise_params)
      flash[:success] = 'Exercise has been updated'
      redirect_to [current_user, @exercise]
    else
      flash[:danger] = 'Exercise has not been updated'
      redirect_to [current_user, @exercise]
    end
  end

  def destroy
    @exercise.destroy
    flash[:success] = 'Exercise has been deleted'
    redirect_to user_exercises_path(current_user)
  end

  private
  def set_exercise
    #byebug
    @exercise = current_user.exercises.find(params[:id])
  end

  def exercise_params
    params.require(:exercise).permit(:duration_in_min, :workout,
                                       :workout_date, :user_id)
  end
end
