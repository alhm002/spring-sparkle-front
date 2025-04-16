
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle2, AlertCircle, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    teamMembers: 0
  });

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = authService.isAuthenticated();
      if (!isAuthenticated) {
        navigate('/login');
        return false;
      }
      return true;
    };

    const loadDashboardData = async () => {
      setIsLoading(true);
      // This would be replaced with actual API calls to your Spring Boot backend
      // For now, we'll use mock data
      setTimeout(() => {
        setDashboardData({
          totalProjects: 12,
          completedProjects: 7,
          totalTasks: 86,
          completedTasks: 64,
          pendingTasks: 22,
          teamMembers: 8
        });
        setIsLoading(false);
      }, 1000);
    };

    if (checkAuthentication()) {
      loadDashboardData();
    }
  }, [navigate]);

  // Calculate percentages for progress bars
  const projectCompletionRate = Math.round((dashboardData.completedProjects / dashboardData.totalProjects) * 100) || 0;
  const taskCompletionRate = Math.round((dashboardData.completedTasks / dashboardData.totalTasks) * 100) || 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {authService.getCurrentUser()?.username || 'User'}! Here's an overview of your projects.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="h-16 bg-gray-200 rounded-lg mb-4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Projects</p>
                      <p className="text-3xl font-bold">{dashboardData.totalProjects}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-500">Completion Rate</p>
                      <p className="text-sm font-medium">{projectCompletionRate}%</p>
                    </div>
                    <Progress value={projectCompletionRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                      <p className="text-3xl font-bold">{dashboardData.totalTasks}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-500">Completion Rate</p>
                      <p className="text-sm font-medium">{taskCompletionRate}%</p>
                    </div>
                    <Progress value={taskCompletionRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Tasks</p>
                      <p className="text-3xl font-bold">{dashboardData.pendingTasks}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/tasks')}>
                      <span>View Tasks</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Team Members</p>
                      <p className="text-3xl font-bold">{dashboardData.teamMembers}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/team')}>
                      <span>View Team</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Your most recently updated projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Website Redesign", progress: 85, status: "In Progress" },
                      { name: "Mobile App Development", progress: 42, status: "In Progress" },
                      { name: "API Integration", progress: 100, status: "Completed" },
                      { name: "Database Migration", progress: 68, status: "In Progress" }
                    ].map((project, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-full mr-4">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{project.name}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              project.status === "Completed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <div className="w-full flex items-center">
                            <Progress value={project.progress} className="h-2 flex-grow mr-2" />
                            <span className="text-xs font-medium">{project.progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button variant="outline" className="w-full" onClick={() => navigate('/projects')}>
                      View All Projects
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Tasks</CardTitle>
                  <CardDescription>Tasks that need your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Design homepage wireframes", project: "Website Redesign", priority: "High", dueDate: "2 days" },
                      { name: "Update API documentation", project: "API Integration", priority: "Medium", dueDate: "4 days" },
                      { name: "Fix login authentication", project: "Mobile App Development", priority: "High", dueDate: "Today" },
                      { name: "Optimize database queries", project: "Database Migration", priority: "Low", dueDate: "1 week" }
                    ].map((task, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{task.name}</p>
                          <p className="text-sm text-gray-500">{task.project}</p>
                        </div>
                        <div className="flex items-center">
                          <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                            task.priority === "High" 
                              ? "bg-red-100 text-red-800" 
                              : task.priority === "Medium" 
                                ? "bg-amber-100 text-amber-800" 
                                : "bg-green-100 text-green-800"
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">{task.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button variant="outline" className="w-full" onClick={() => navigate('/tasks')}>
                      View All Tasks
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
