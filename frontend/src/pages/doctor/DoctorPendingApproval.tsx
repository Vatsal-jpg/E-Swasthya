import { Link } from "react-router-dom";
import { Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const DoctorPendingApproval = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-10 h-10 text-yellow-600" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    Verification Pending
                </h1>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you for registering! Your account is currently under review by our administrators.
                    You will be notified once your documents have been verified and your account is approved.
                </p>

                <div className="space-y-3">
                    <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        This process usually takes 24-48 hours. Please check back later.
                    </p>

                    <Link to="/">
                        <Button variant="outline" className="w-full mt-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>

                    <div className="pt-4">
                        <Link to="/doctor/login" className="text-blue-600 text-sm hover:underline">
                            Check Status (Login)
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorPendingApproval;
