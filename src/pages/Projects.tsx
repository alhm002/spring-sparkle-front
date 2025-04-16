
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, Search, Filter, User2, Calendar as CalendarIcon } from 'lucide-react';

// Mock interface for Project data
interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'On Hold' | 'Completed';
  progress: number;
  startDate: string;
  endDate: string;
  teamMembers: number;
  tasks: number;
}

const Projects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = authService.isAuthenticated();
      if (!isAuthenticated) {
        navigate('/login');
        return false;
      }
      return true;
    };

    const loadProjects = async () => {
      setIsLoading(true);
      // This would be replaced with actual API calls to your Spring Boot backend
      // For now, we'll use mock data
      setTimeout(() => {
        const mockProjects: Project[] = [
          {
            id: 1,
            name: 'Website Redesign',
            description: 'Redesigning the company website with a modern look and improved UX',
            status: 'In Progress',
            progress: 85,
            startDate: '2025-01-05',
            endDate: '2025-05-30',
            teamMembers: 5,
            tasks: 24
          },
          {
            id: 2,
            name: 'Mobile App Development',
            description: 'Creating a new mobile app for our customers',
            status: 'In Progress',
            progress: 42,
            startDate: '2025-02-15',
            endDate: '2025-08-10',
            teamMembers: 7,
            tasks: 38
          },
          {
            id: 3,
            name: 'API Integration',
            description: 'Integrating third-party services into our platform',
            status: 'Completed',
            progress: 100,
            startDate: '2025-01-10',
            endDate: '2025-03-15',
            teamMembers: 3,
            tasks: 12
          },
          {
            id: 4,
            name: 'Database Migration',
            description: 'Moving from legacy database to a modern solution',
            status: 'In Progress',
            progress: 68,
            startDate: '2025-03-01',
            endDate: '2025-06-30',
            teamMembers: 4,
            tasks: 18
          },
          {
            id: 5,
            name: 'Security Audit',
            description: 'Comprehensive security review and improvements',
            status: 'Not Started',
            progress: 0,
            startDate: '2025-05-01',
            endDate: '2025-06-15',
            teamMembers: 2,
            tasks: 10
          },
          {
            id: 6,
            name: 'AI Chatbot Development',
            description: 'Building an AI chatbot for customer service',
            status: 'On Hold',
            progress: 30,
            startDate: '2025-02-10',
            endDate: '2025-07-20',
            teamMembers: 4,
            tasks: 22
          }
        ];
        
        setProjects(mockProjects);
        setIsLoading(false);
      }, 1000);
    };

    if (checkAuthentication()) {
      loadProjects();
    }
  }, [navigate]);

  // Filter the projects based on search query and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get the status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-200 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'On Hold':
        return 'bg-amber-100 text-amber-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Projects</h1>
            <p className="text-gray-600">Manage and track all your projects</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate('/projects/new')}>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Project</span>
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  className="pl-10" 
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="md:col-span-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-4 flex justify-end">
                <div className="flex items-center text-sm text-gray-500">
                  <span>Total Projects: </span>
                  <span className="ml-1 font-bold">{projects.length}</span>
                  <div className="h-4 w-px mx-3 bg-gray-300"></div>
                  <span>Showing: </span>
                  <span className="ml-1 font-bold">{filteredProjects.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader className="h-20 bg-gray-100"></CardHeader>
                <CardContent className="py-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-100 rounded mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded mb-4 w-2/3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <>
            <div className="hidden lg:block">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Timeline</TableHead>
                        <TableHead className="text-right">Team</TableHead>
                        <TableHead className="text-right">Tasks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow 
                          key={project.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => navigate(`/projects/${project.id}`)}
                        >
                          <TableCell>
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-md">{project.description}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(project.status)}>
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Progress value={project.progress} className="h-2 w-24 mr-2" />
                              <span className="text-sm font-medium">{project.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                              <span className="text-sm">
                                {formatDate(project.startDate)} - {formatDate(project.endDate)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <User2 className="h-3.5 w-3.5 mr-1 text-gray-500" />
                              <span>{project.teamMembers}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{project.tasks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge className={getStatusBadgeColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-gray-500">Progress</p>
                        <p className="text-sm font-medium">{project.progress}%</p>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-gray-500">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                        <span>{formatDate(project.startDate)}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{formatDate(project.endDate)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 border-t border-gray-100">
                    <div className="flex justify-between w-full text-sm">
                      <div className="flex items-center">
                        <User2 className="h-3.5 w-3.5 mr-1 text-gray-500" />
                        <span className="text-gray-600">{project.teamMembers} members</span>
                      </div>
                      <div className="text-gray-600">{project.tasks} tasks</div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-gray-500 text-center mb-6">
                We couldn't find any projects matching your search criteria.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
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

export default Projects;
