
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Plus, Search } from 'lucide-react';

// Mock interface for Task data
interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate: string;
  project: string;
  assignedTo: string;
}

const Tasks = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = authService.isAuthenticated();
      if (!isAuthenticated) {
        navigate('/login');
        return false;
      }
      return true;
    };

    const loadTasks = async () => {
      setIsLoading(true);
      // This would be replaced with actual API calls to your Spring Boot backend
      // For now, we'll use mock data
      setTimeout(() => {
        const mockTasks: Task[] = [
          {
            id: 1,
            title: 'Design homepage wireframes',
            description: 'Create wireframes for the new homepage design',
            priority: 'High',
            status: 'In Progress',
            dueDate: '2025-04-20',
            project: 'Website Redesign',
            assignedTo: 'Jane Smith'
          },
          {
            id: 2,
            title: 'Implement user authentication',
            description: 'Add login and registration functionality',
            priority: 'High',
            status: 'In Progress',
            dueDate: '2025-04-18',
            project: 'Mobile App Development',
            assignedTo: 'John Doe'
          },
          {
            id: 3,
            title: 'Write API documentation',
            description: 'Document all API endpoints for developers',
            priority: 'Medium',
            status: 'To Do',
            dueDate: '2025-04-25',
            project: 'API Integration',
            assignedTo: 'Sara Johnson'
          },
          {
            id: 4,
            title: 'Optimize database queries',
            description: 'Improve performance of database operations',
            priority: 'Medium',
            status: 'To Do',
            dueDate: '2025-04-28',
            project: 'Database Migration',
            assignedTo: 'Mike Chen'
          },
          {
            id: 5,
            title: 'Fix login page bugs',
            description: 'Address reported issues with the login screen',
            priority: 'High',
            status: 'To Do',
            dueDate: '2025-04-17',
            project: 'Mobile App Development',
            assignedTo: 'John Doe'
          },
          {
            id: 6,
            title: 'Create UI components library',
            description: 'Develop reusable UI components for the project',
            priority: 'Low',
            status: 'Done',
            dueDate: '2025-04-10',
            project: 'Website Redesign',
            assignedTo: 'Jane Smith'
          },
          {
            id: 7,
            title: 'Set up CI/CD pipeline',
            description: 'Configure automated testing and deployment',
            priority: 'Medium',
            status: 'Done',
            dueDate: '2025-04-08',
            project: 'API Integration',
            assignedTo: 'Mike Chen'
          },
          {
            id: 8,
            title: 'Implement file upload feature',
            description: 'Allow users to upload profile pictures',
            priority: 'Low',
            status: 'In Progress',
            dueDate: '2025-04-22',
            project: 'Mobile App Development',
            assignedTo: 'Sara Johnson'
          }
        ];
        
        setTasks(mockTasks);
        setIsLoading(false);
      }, 1000);
    };

    if (checkAuthentication()) {
      loadTasks();
    }
  }, [navigate]);

  // Filter tasks based on search query, priority, and status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Get the priority badge color
  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Check if a task is overdue
  const isOverdue = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tasks</h1>
            <p className="text-gray-600">Manage and track all your tasks</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate('/tasks/new')}>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Task</span>
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  className="pl-10" 
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="md:col-span-3">
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Priorities</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="animate-pulse">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="mb-4 bg-gray-100 rounded-lg p-4 h-20"></div>
            ))}
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <Card 
                key={task.id}
                className={`cursor-pointer transition-shadow duration-200 ${task.status === 'Done' ? 'opacity-80' : ''}`}
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3">
                      <Checkbox 
                        checked={task.status === 'Done'} 
                        onCheckedChange={(checked) => {
                          // This would normally call an API to update the task
                          console.log(`Task ${task.id} checked: ${checked}`);
                        }} 
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className={`font-medium ${task.status === 'Done' ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                          <Badge className={getPriorityBadgeColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge variant="outline" className="border-gray-200 text-gray-700">
                            {task.project}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-2 gap-2">
                        <div className="flex items-center">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                          <span className={isOverdue(task.dueDate) && task.status !== 'Done' ? 'text-red-600 font-medium' : ''}>
                            Due {formatDate(task.dueDate)}
                          </span>
                        </div>
                        <div className="hidden sm:block text-gray-300 mx-2">•</div>
                        <div>Assigned to {task.assignedTo}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-gray-500 text-center mb-6">
                We couldn't find any tasks matching your search criteria.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setPriorityFilter('All');
                setStatusFilter('All');
              }}>
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;
