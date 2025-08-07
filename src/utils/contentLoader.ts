/**
 * contentLoader.ts
 * 
 * This utility provides functions to load and parse content from the CMS.
 * It handles loading content from the CMS and provides interfaces for content types.
 * In a production environment, this would fetch data from an API endpoint.
 */

// Define interfaces for our content types
export interface TeamMember {
  name: string;
  position: string;
  photo: string;
  bio: string;
  order: number;
}

export interface Service {
  title: string;
  icon: string;
  description: string;
  order: number;
}

export interface SiteSettings {
  title: string;
  description: string;
  logo: string;
  email: string;
  phone: string;
}

// Load team members from markdown files
export const loadTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    // In a browser environment, we'd use an API call instead
    // This is just for demonstration of the structure
    return [
      {
        name: "John Doe",
        position: "Chief Technology Officer",
        photo: "/images/uploads/john-doe.jpg",
        bio: "John has over 15 years of experience in software development and technology leadership. He specializes in cloud architecture and enterprise solutions.",
        order: 1
      },
      {
        name: "Jane Smith",
        position: "Lead Developer",
        photo: "/images/uploads/jane-smith.jpg",
        bio: "Jane is an expert in frontend development with React and TypeScript. She has led multiple successful projects for enterprise clients.",
        order: 2
      }
    ];
  } catch (error) {
    console.error("Error loading team members:", error);
    return [];
  }
};

// Load services from markdown files
export const loadServices = async (): Promise<Service[]> => {
  try {
    // In a browser environment, we'd use an API call instead
    // This is just for demonstration of the structure
    return [
      {
        title: "Web Development",
        icon: "Code",
        description: "Custom web application development using modern frameworks and technologies. We create responsive, scalable, and high-performance web solutions tailored to your business needs.",
        order: 1
      },
      {
        title: "Mobile Apps",
        icon: "PhoneIphone",
        description: "Native and cross-platform mobile application development for iOS and Android. We build intuitive, feature-rich mobile experiences that engage users.",
        order: 2
      }
    ];
  } catch (error) {
    console.error("Error loading services:", error);
    return [];
  }
};

// Load site settings from JSON
export const loadSiteSettings = async (): Promise<SiteSettings> => {
  try {
    // In a browser environment, we'd use an API call instead
    // This is just for demonstration of the structure
    return {
      title: "IVO-TECH",
      description: "Innovative Technology Solutions for Modern Business. Transform your digital vision into reality with cutting-edge technology and expert development.",
      logo: "/images/uploads/logo.svg",
      email: "contact@ivo-tech.com",
      phone: "+49 123 456789"
    };
  } catch (error) {
    console.error("Error loading site settings:", error);
    return {
      title: "IVO-TECH",
      description: "",
      logo: "",
      email: "",
      phone: ""
    };
  }
};
