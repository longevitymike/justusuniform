import { Header } from "@/components/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
const SizeGuide = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black text-foreground">Size Guide</h1>
            <p className="text-lg text-muted-foreground">
              Find the perfect fit for your child. All measurements are in inches.
            </p>
          </div>

          <div className="bg-card rounded-[var(--radius)] border p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Kids' Uniform Pants Sizing</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Size</TableHead>
                    <TableHead className="font-bold">Waist (in)</TableHead>
                    <TableHead className="font-bold">Hips (in)</TableHead>
                    <TableHead className="font-bold">Inseam (in)</TableHead>
                    <TableHead className="font-bold">Age Range</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    
                    <TableCell>20-21</TableCell>
                    <TableCell>22-23</TableCell>
                    <TableCell>15-16</TableCell>
                    <TableCell>3-4 years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">5/6</TableCell>
                    <TableCell>21-22</TableCell>
                    <TableCell>23-24</TableCell>
                    <TableCell>16-17</TableCell>
                    <TableCell>4-5 years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">6/7</TableCell>
                    <TableCell>22-23</TableCell>
                    <TableCell>24-25</TableCell>
                    <TableCell>17-18</TableCell>
                    <TableCell>5-6 years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">7/8</TableCell>
                    <TableCell>23-24</TableCell>
                    <TableCell>25-26</TableCell>
                    <TableCell>18-19</TableCell>
                    <TableCell>6-7 years</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-xl font-bold">How to Measure</h3>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">Waist:</p>
                  <p>Measure around the natural waistline, keeping the tape comfortably loose.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Hips:</p>
                  <p>Measure around the fullest part of the hips.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Inseam:</p>
                  <p>Measure from the crotch to the desired hem length.</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <p className="text-sm text-foreground">
                <strong>Tip:</strong> Between sizes? We recommend sizing up for growing kids. 
                Our pants are designed with adjustable waistbands for the perfect fit!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default SizeGuide;