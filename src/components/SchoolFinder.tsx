import { useState } from "react";
import { Search, CheckCircle2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock school data - will be replaced with Shopify metaobject later
const SCHOOL_DATA = [
  { id: 1, name: "Lincoln Elementary", city: "Brooklyn", state: "NY", zip: "11201", allowedColors: ["Navy", "Khaki"], notes: "No logos, belt required" },
  { id: 2, name: "Roosevelt Middle School", city: "Queens", state: "NY", zip: "11375", allowedColors: ["Navy", "Black", "Khaki"], notes: "Wrinkle-resistant preferred" },
  { id: 3, name: "Washington High", city: "Manhattan", state: "NY", zip: "10001", allowedColors: ["Black", "Navy"], notes: "Belt loops required" },
  { id: 4, name: "Jefferson Academy", city: "Bronx", state: "NY", zip: "10451", allowedColors: ["Navy", "Khaki"], notes: "Logo-free uniform" },
  { id: 5, name: "Madison Elementary", city: "Staten Island", state: "NY", zip: "10301", allowedColors: ["Khaki", "Black"], notes: "Loose fit acceptable" },
  { id: 6, name: "Hamilton Charter", city: "Los Angeles", state: "CA", zip: "90001", allowedColors: ["Navy", "Khaki", "Black"], notes: "Standard uniform code" },
  { id: 7, name: "Franklin School", city: "Chicago", state: "IL", zip: "60601", allowedColors: ["Navy"], notes: "Navy only policy" },
  { id: 8, name: "Kennedy Prep", city: "Houston", state: "TX", zip: "77001", allowedColors: ["Khaki", "Navy"], notes: "Belt required, no cargo" },
];

const COLOR_MAP: Record<string, string> = {
  Navy: "bg-[#001f3f] text-white border-[#001f3f]",
  Khaki: "bg-[#c3b091] text-foreground border-[#c3b091]",
  Black: "bg-foreground text-background border-foreground",
};

interface SchoolFinderProps {
  onSchoolSelect?: (school: typeof SCHOOL_DATA[0]) => void;
  compact?: boolean;
}

export const SchoolFinder = ({ onSchoolSelect, compact = false }: SchoolFinderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<typeof SCHOOL_DATA[0] | null>(null);
  const [showResults, setShowResults] = useState(false);

  const filteredSchools = SCHOOL_DATA.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.zip.includes(searchTerm)
  );

  const handleSelectSchool = (school: typeof SCHOOL_DATA[0]) => {
    setSelectedSchool(school);
    setShowResults(false);
    setSearchTerm("");
    localStorage.setItem("selectedSchool", JSON.stringify(school));
    onSchoolSelect?.(school);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  if (compact && selectedSchool) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CheckCircle2 className="w-4 h-4 text-accent" />
        <span>Compliant for {selectedSchool.name}</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="headline-3 font-bold">Find Your School</h3>
          <p className="body-md text-muted-foreground">
            Search by school name or ZIP to see dress-code approved colors
          </p>
        </div>

        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search your school or ZIP"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchTerm && setShowResults(true)}
              className="pl-10 h-12 text-base"
              aria-label="Search for your school"
            />
          </div>

          {/* Search Results Dropdown */}
          {showResults && filteredSchools.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
              {filteredSchools.slice(0, 5).map((school) => (
                <button
                  key={school.id}
                  onClick={() => handleSelectSchool(school)}
                  className="w-full text-left px-4 py-3 hover:bg-accent/5 transition-colors border-b border-border last:border-b-0 focus:outline-none focus:bg-accent/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{school.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span>{school.city}, {school.state} {school.zip}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {school.allowedColors.map(color => (
                        <div
                          key={color}
                          className={`w-6 h-6 rounded border-2 ${COLOR_MAP[color]}`}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {showResults && filteredSchools.length === 0 && searchTerm && (
            <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-lg shadow-lg p-4 text-center text-sm text-muted-foreground">
              No schools found. Try searching by school name, city, or ZIP code.
            </div>
          )}
        </div>

        {/* Selected School Display */}
        {selectedSchool && (
          <div className="bg-accent/10 border-2 border-accent rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <h4 className="font-bold text-base">{selectedSchool.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedSchool.city}, {selectedSchool.state} {selectedSchool.zip}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Approved Colors:</div>
              <div className="flex flex-wrap gap-2">
                {selectedSchool.allowedColors.map(color => (
                  <Badge
                    key={color}
                    variant="outline"
                    className={`${COLOR_MAP[color]} px-3 py-1 border-2 font-semibold`}
                  >
                    {color}
                  </Badge>
                ))}
              </div>
            </div>

            {selectedSchool.notes && (
              <div className="text-sm text-muted-foreground pt-2 border-t border-border">
                <span className="font-semibold">Dress Code Notes:</span> {selectedSchool.notes}
              </div>
            )}

            <Button
              asChild
              className="w-full mt-2"
              size="lg"
            >
              <a href={`/product/just-us-uniform-pants?school=${selectedSchool.id}`}>
                Shop Compliant Pants for {selectedSchool.name}
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
